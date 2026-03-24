import { useState } from "react";
import { MovieListItem } from "@/types/thmdb";

export default function useFavorites() {
  const [favorites, setFavorites] = useState<MovieListItem[]>(() => {
    const stored = localStorage?.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  function toggleFavorite(movie: MovieListItem) {
    let updated;

    if (favorites.some((m) => m.id === movie.id)) {
      updated = favorites?.filter((m) => m.id !== movie.id);
    } else {
      updated = [...favorites, movie];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }

  return { favorites, toggleFavorite };
}
