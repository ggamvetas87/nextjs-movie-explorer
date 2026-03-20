"use client";

import { useState, useEffect } from "react";
import { useMovies } from "@/context/MoviesContext";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import SearchBar from "@/components/search/SearchBar";
import MovieRow from "@/components/grids/MovieRow";
import HeroCarousel from "@/components/sliders/HeroCarousel";
import MovieCarousel from "@/components/sliders/MovieCarousel";
import SearchResults from "@/components/search/SearchResults";
import { searchMovies, getTrendingMovies, getMovieTagList } from "@/lib/api";
import { MovieListItem } from "@/types/movies";

export default function Home() {
  const { loading, movies, setMovies, query, setQuery } = useMovies();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [heroBanners, setHeroBanners] = useState<MovieListItem[] | null>(null);
  const [trending, setTrending] = useState<MovieListItem[] | null>(null);
  const [upcoming, setUpcoming] = useState<MovieListItem[] | null>(null);

  useEffect(() => {
    // Load initial data for hero banners, trending and upcoming sections
    getMovieTagList("popular").then(setHeroBanners);
    getTrendingMovies().then(setTrending);
    getMovieTagList("upcoming").then(setUpcoming);
  }, []);

  async function handleSearch(newQuery: string) {
    setPage(1);
    setQuery(newQuery);

    const data = await searchMovies(newQuery, 1, 4);

    setMovies(data.movies);
    setHasMore(data.hasMore);
  }

  async function loadMoreMovies() {
    if (!hasMore) return;

    const nextPage = page + 1;
    const data = await searchMovies(query, nextPage, 4);

    setMovies([...movies, ...data.movies]);
    setPage(nextPage);
    setHasMore(data.hasMore);
  }

  useInfiniteScroll(() => {
    loadMoreMovies();
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Movie Explorer
      </h1>

      <SearchBar onSearch={handleSearch} />
      {movies && <SearchResults movies={movies} />}
    
      {!movies.length && !loading && (
        <div>
          {heroBanners && <HeroCarousel movies={heroBanners} count={6} />}
          <div>
            {trending && (
              <MovieRow title="Trending">
                <MovieCarousel movies={trending} count={20} />
              </MovieRow>
            )}
            {upcoming && (
              <MovieRow title="Upcoming">
                <MovieCarousel movies={upcoming} count={20} />
              </MovieRow>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
