"use client";

import { useState, useEffect, useRef } from "react";
import { useMovies } from "@/context/MoviesContext";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useFavorites from "@/hooks/useFavorites";
import SearchBar from "@/components/search/SearchBar";
import MovieRow from "@/components/grids/MovieRow";
import HeroCarousel from "@/components/sliders/HeroCarousel";
import MovieCarousel from "@/components/sliders/MovieCarousel";
import SearchResults from "@/components/search/SearchResults";
import {
  searchMovies,
  getFavoriteMovies
} from "@/lib/client/api";
import { MovieListItem } from "@/types/thmdb";

type Props = {
  initialQuery: string;
  initialPage?: number;
  heroBanners?: MovieListItem[];
  trending?: MovieListItem[];
  upcoming?: MovieListItem[];
};

export default function HomeClient({
  initialQuery,
  initialPage = 1,
  heroBanners: initialHeroBanners,
  trending: initialTrending,
  upcoming: initialUpcoming
}: Props) {

  const { loading, movies, setMovies, query, setQuery } = useMovies();
  const { favorites } = useFavorites();

  const loadingRef = useRef(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const prevQueryRef = useRef(query);

  const [page, setPage] = useState(() => query && query !== initialQuery ? 1 : initialPage);

  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const [favoriteMovies, setFavoriteMovies] = useState<MovieListItem[]>([]);
  const [heroBanners] = useState(initialHeroBanners ?? null);
  const [trending] = useState(initialTrending ?? null);
  const [upcoming] = useState(initialUpcoming ?? null);

  const getCurrentPage = (pageNumber?: number) => pageNumber ?? page;

  useEffect(() => {
    if (!favorites || favorites.length === 0) return;

    getFavoriteMovies(favorites, 10).then((data) =>
      setFavoriteMovies(data.movies)
    );
  }, [favorites]);

  useEffect(() => {
    if (prevQueryRef.current !== query) {
      setPage(1);
    }

    prevQueryRef.current = query;
  }, [query]);

  useEffect(() => {
    if (!initialQuery) return;

    const currentPage = getCurrentPage();

    requestAnimationFrame(() => {
      window.scrollTo({
        top: (currentPage - 1) * 1,
        behavior: "smooth"
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  useEffect(() => {
    // If there's no initial query or we already have movies 
    // (e.g. from a previous search), don't re-run the search
    // due to RSC re-rendering the component on the client
    // We only want to run the search on the initial render
    if (!initialQuery || movies.length > 0) return;

    async function init() {
      const currentPage = getCurrentPage();
      const data = await searchMovies(initialQuery, currentPage);

      setQuery(initialQuery);
      setMovies(data.movies);
      setPage(currentPage);
      setHasMore(data.hasMore);
      setTotalResults(data.totalResults);
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery, initialPage]);

  function updateUrl(query: string, page: number) {
    const url = new URL(window.location.href);
    const currentPage = getCurrentPage(page);

    if (query) {
      url.searchParams.set("query", query);
      url.searchParams.set("page", String(currentPage));
    } else {
      url.searchParams.delete("query");
      url.searchParams.delete("page");
    }

    window.history.replaceState({}, "", url);
  }

  function clearSearchFromUrl() {
    setMovies([]);
    setQuery("");
    setPage(1);
    updateUrl("", 1);
  }

  function onTextboxClear() {
    clearSearchFromUrl();
  }

  async function handleSearch(newQuery: string) {
    const currentPage = getCurrentPage();
    const trimmedQuery = newQuery.trim();

    if (!trimmedQuery) {
      clearSearchFromUrl();
      return;
    }

    setQuery(trimmedQuery);
    updateUrl(trimmedQuery, currentPage);

    const data = await searchMovies(trimmedQuery, currentPage);

    setMovies(data.movies);
    setHasMore(data.hasMore);
    setTotalResults(data.totalResults);
  }

  async function loadMoreMovies() {
    if (!hasMore || loadingRef.current) return;

    loadingRef.current = true;

    const nextPage = getCurrentPage() + 1;
    const data = await searchMovies(query, nextPage);

    // setMovies([...movies, ...data.movies]);
    // Use functional update to avoid duplicate movies 
    // when multiple requests are made in quick succession
    setMovies(prev => {
      const map = new Map(prev.map((m: MovieListItem) => [m.id, m]));
      data.movies.forEach((m: MovieListItem) => map.set(m.id, m));
      return Array.from(map.values());
    });
    setPage(nextPage);
    setHasMore(data.hasMore);
    setTotalResults(data.totalResults);

    updateUrl(query, nextPage);
    loadingRef.current = false;
  }

  useInfiniteScroll(() => {
    if (!query) return;
    loadMoreMovies();
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        🎬 Movie Explorer
      </h1>

      <SearchBar
        onSearch={handleSearch}
        onClear={onTextboxClear}
      />

      {movies && (
        <div ref={resultsRef}>
          <SearchResults
            query={query}
            movies={movies}
            page={page}
            totalResults={totalResults}
          />
        </div>
      )}

      {!movies.length && !loading && (
        <div>
          {heroBanners && (
            <HeroCarousel movies={heroBanners} count={6} />
          )}
          <div>
            {favoriteMovies.length > 0 && (
              <MovieRow title="❤️ Favorites">
                <MovieCarousel movies={favoriteMovies} count={10} />
              </MovieRow>
            )}
            {trending && (
              <MovieRow title="🔥 Trending">
                <MovieCarousel movies={trending} count={20} />
              </MovieRow>
            )}
            {upcoming && (
              <MovieRow title="📅 Upcoming">
                <MovieCarousel movies={upcoming} count={20} />
              </MovieRow>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
