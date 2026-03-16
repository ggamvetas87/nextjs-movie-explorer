import { useState } from "react";
import { MovieListItem } from "@/types/movies";

export default function useFavorites() {
  const [favorites, setFavorites] = useState<MovieListItem[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  function toggleFavorite(movie: MovieListItem) {
    let updated;

    if (favorites.some((m) => m["#IMDB_ID"] === movie["#IMDB_ID"])) {
      updated = favorites.filter((m) => m["#IMDB_ID"] !== movie["#IMDB_ID"]);
    } else {
      updated = [...favorites, movie];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }

  return { favorites, toggleFavorite };
}
