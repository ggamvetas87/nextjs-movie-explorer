"use client";

import { useState, useEffect } from "react";
import { useMovies } from "@/context/MoviesContext";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import MovieRow from "@/components/MovieRow";
import HeroBanner from "@/components/HeroBanner";
import HeroSkeleton from "@/components/HeroSkeleton";
import { searchMovies } from "@/lib/api";
import { loadMovies } from "@/lib/helpers";
import { MovieListItem } from "@/types/movies";

export default function Home() {
  const { loading, movies, setMovies, query, setQuery } = useMovies();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [heroBanners, setHeroBanners] = useState<MovieListItem[] | null>(null);
  const [popular, setPopular] = useState<MovieListItem[] | null>(null);
  const [trending, setTrending] = useState<MovieListItem[] | null>(null);

  useEffect(() => {
    loadMovies("Star Wars", 1, 8).then(setHeroBanners);
    loadMovies("Adventure", 1, 8).then(setPopular);
    loadMovies("Comedy", 1, 8).then(setTrending);
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
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Movie Explorer
      </h1>

      <SearchBar onSearch={handleSearch} />
      {movies && <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie["#IMDB_ID"]} movie={movie} />
        ))}
      </div>}
      {heroBanners && (!movies.length && !loading) ? (
        <div>
          <HeroBanner movie={heroBanners[0]} />
          {trending && <MovieRow
            title="Trending"
            movies={trending.slice(0, 4)}
          />}
          {popular && <MovieRow
            title="Popular"
            movies={popular.slice(0, 4)}
          />}
        </div>
      ) : !query && !movies.length && (
        <HeroSkeleton />
      )}
    </main>
  );
}
