"use client";

import { useState, useEffect } from "react";
import { useMovies } from "@/context/MoviesContext";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import SearchBar from "@/components/SearchBar";
import MovieRow from "@/components/MovieRow";
import HeroCarousel from "@/components/sliders/HeroCarousel";
import MoviesGrid from "@/components/MoviesGrid";
import { searchMovies } from "@/lib/api";
import { loadMovies } from "@/lib/helpers";
import { MovieListItem } from "@/types/movies";

export default function Home() {
  const { loading, movies, setMovies, query, setQuery } = useMovies();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [heroBanners, setHeroBanners] = useState<MovieListItem[] | null>(null);
  const [trending, setTrending] = useState<MovieListItem[] | null>(null);
  const [popular, setPopular] = useState<MovieListItem[] | null>(null);

  useEffect(() => {
    // Load initial data for hero banners, trending and popular sections
    loadMovies("Lethal Weapon", 1, 4).then(setHeroBanners);
    loadMovies("Comedy", 1, 8).then(setTrending);
    loadMovies("Adventure", 1, 8).then(setPopular);
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
      <h1 className="text-3xl font-bold mb-6">
        Movie Explorer
      </h1>

      <SearchBar onSearch={handleSearch} />
      {movies && <MoviesGrid movies={movies} />}
    
      {!movies.length && !loading && (
        <div>
          {heroBanners && <HeroCarousel movies={heroBanners} />}
          <div>
            {trending && <MovieRow
              title="Trending"
              movies={trending}
            />}
            {popular && <MovieRow
              title="Popular"
              movies={popular}
            />}
          </div>
        </div>
      )}
    </div>
  );
}
