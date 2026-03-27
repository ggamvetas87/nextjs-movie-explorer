"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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
  getTrendingMovies,
  getMovieTagList,
  getFavoriteMovies
} from "@/lib/api";
import { MovieListItem } from "@/types/thmdb";

type Props = {
  initialQuery: string;
  initialPage?: number;
};

const itemsPerPage = 20;

export default function HomeClient({
  initialQuery,
  initialPage = 1
}: Props) {

  const { loading, movies, setMovies, query, setQuery } = useMovies();

  const router = useRouter();
  const { favorites } = useFavorites();

  const resultsRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(initialPage);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const [heroBanners, setHeroBanners] = useState<MovieListItem[] | null>(null);
  const [favoriteMovies, setFavoriteMovies] = useState<MovieListItem[]>([]);
  const [trending, setTrending] = useState<MovieListItem[] | null>(null);
  const [upcoming, setUpcoming] = useState<MovieListItem[] | null>(null);

  useEffect(() => {
    getMovieTagList("popular").then(setHeroBanners);
    getTrendingMovies().then(setTrending);
    getMovieTagList("upcoming").then(setUpcoming);
  }, []);

  useEffect(() => {
    if (!favorites || favorites.length === 0) return;

    getFavoriteMovies(favorites, 10).then((data) =>
      setFavoriteMovies(data.movies)
    );
  }, [favorites]);

  useEffect(() => {
    if (!initialQuery) return;

    async function init() {
      let allMovies: MovieListItem[] = [];

      const pages = await Promise.all(
        Array.from({ length: initialPage }, (_, i) =>
          searchMovies(initialQuery, i + 1)
        )
      );

      allMovies = pages.flatMap(p => p.movies);

      setQuery(initialQuery);
      setMovies(allMovies);
      setHasMore(true);

      // scroll restore
      // requestAnimationFrame(() => {
      //   const el = resultsRef.current;
      //   if (!el) return;

      //   const targetIndex = (initialPage - 1) * itemsPerPage;

      //   const item = el.children[targetIndex] as HTMLElement;

      //   item?.scrollIntoView({
      //     behavior: "instant",
      //     block: "start"
      //   });
      // });
    }

    init();
  }, [initialQuery, initialPage, setMovies, setQuery]);

  function updateUrl(newQuery: string, newPage: number) {
    router.replace(`/?query=${encodeURIComponent(newQuery)}&page=${newPage}`, { scroll: false });
  }

  function clearSearchFromUrl() {
    router.push("/");
  }

  function onTextboxClear() {
    clearSearchFromUrl();
  }

  async function handleSearch(newQuery: string) {
    const trimmedQuery = newQuery.trim();

    if (!trimmedQuery) {
      clearSearchFromUrl();
      return;
    }

    setPage(1);
    setQuery(newQuery);

    updateUrl(newQuery, 1);

    const data = await searchMovies(newQuery, 1);

    setMovies(data.movies);
    setHasMore(data.hasMore);
    setTotalResults(data.totalResults);
  }

  async function loadMoreMovies() {
    if (!hasMore) return;

    const nextPage = page + 1;

    const data = await searchMovies(query, nextPage);

    setMovies([...movies, ...data.movies]);
    setPage(nextPage);
    setHasMore(data.hasMore);
    setTotalResults(data.totalResults);

    updateUrl(query, nextPage);
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
