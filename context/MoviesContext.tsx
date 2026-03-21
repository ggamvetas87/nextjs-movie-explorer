"use client";

import { createContext, useContext, useState, useMemo } from "react";
import { MovieListItem } from "@/types/thmdb";

type MoviesContextType = {
  movies: MovieListItem[];
  setMovies: (movies: MovieListItem[]) => void;

  query: string;
  setQuery: (query: string) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  favorites: MovieListItem[];
  toggleFavorite: (movie: MovieListItem) => void;
};

const MoviesContext = createContext<MoviesContextType | null>(null);

export function MoviesProvider({ children }: { children: React.ReactNode }) {
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<MovieListItem[]>([]);

  function toggleFavorite(movie: MovieListItem) {
    setFavorites((prev) => {
      const exists = prev.find((m) => m["#IMDB_ID"] === movie["#IMDB_ID"]);

      if (exists) {
        return prev.filter((m) => m["#IMDB_ID"] !== movie["#IMDB_ID"]);
      }

      return [...prev, movie];
    });
  }

  const value = useMemo(
    () => ({
      movies,
      setMovies,
      query,
      setQuery,
      loading,
      setLoading,
      favorites,
      toggleFavorite
    }),
    [movies, query, loading, favorites]
  );

  return (
    <MoviesContext.Provider value={value}>
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MoviesContext);

  if (!context) {
    throw new Error("useMovies must be used inside MoviesProvider");
  }

  return context;
}
