"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

export default function Home() {
  const { loading, movies, setMovies, query, setQuery } = useMovies();

  const searchParams = useSearchParams();
  const router = useRouter();
  const { favorites } = useFavorites();

  const initialPage = Number(searchParams.get("page") || 1);
  const initialQuery = searchParams.get("query") || "";

  const [page, setPage] = useState(initialPage);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [heroBanners, setHeroBanners] = useState<MovieListItem[] | null>(null);
  const [favoriteMovies, setFavoriteMovies] = useState<MovieListItem[] | []>([]);
  const [trending, setTrending] = useState<MovieListItem[] | null>(null);
  const [upcoming, setUpcoming] = useState<MovieListItem[] | null>(null);

  useEffect(() => {
    // Load initial data for hero banners, trending and upcoming sections
    getMovieTagList("popular").then(setHeroBanners);
    getTrendingMovies().then(setTrending);
    getMovieTagList("upcoming").then(setUpcoming);
  }, []);

  useEffect(() => {
    // Load favorites
    if (!favorites || favorites.length === 0) return;

    getFavoriteMovies(favorites, 10).then((data) => setFavoriteMovies(data.movies));
  }, [favorites]);

  useEffect(() => {
    if (!initialQuery) return;

    async function init() {
      let allMovies: MovieListItem[] = [];

      for (let i = 1; i <= initialPage; i++) {
        const data = await searchMovies(initialQuery, i);
        allMovies = [...allMovies, ...data.movies];
      }

      setQuery(initialQuery);
      setMovies(allMovies);
      setHasMore(true);
    }

    init();
  }, []);

  // Update URL with new query and page without causing a full page reload
  function updateUrl(newQuery: string, newPage: number) {
    const params = new URLSearchParams();

    if (newQuery) params.set("query", newQuery);
    params.set("page", newPage.toString());

    router.replace(`?${params.toString()}`, { scroll: false });
  }

  // Clear query and page from URL when search is cleared
  function clearSearchFromUrl() {
    const params = new URLSearchParams(window.location.search);

    params.delete("query");
    params.delete("page");

    const newUrl = params.toString() ? `?${params.toString()}` : "/";

    router.replace(newUrl, { scroll: false });
  }

  function onTextboxClear(value?: string) {
    clearSearchFromUrl();
  }

  // Handle new search queries
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
  
  // Load more movies when user scrolls to the bottom
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

  // Automatically load more movies when user scrolls to the bottom
  useInfiniteScroll(() => {
    if (query) loadMoreMovies();
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
      {movies && <SearchResults 
        query={query} 
        movies={movies}
        page={page}
        totalResults={totalResults} 
      />}
    
      {!movies.length && !loading && (
        <div>
          {heroBanners && <HeroCarousel movies={heroBanners} count={6} />}
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
