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
};

const MoviesContext = createContext<MoviesContextType | null>(null);

export function MoviesProvider({ children }: { children: React.ReactNode }) {
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const value = useMemo(
    () => ({
      movies,
      setMovies,
      query,
      setQuery,
      loading,
      setLoading
    }),
    [movies, query, loading]
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
