"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function useFavorites() {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<string[]>([]);

  const storageKey = (session?.user?.email || session?.user?.name) ? `favorites_${session.user.email ?? session.user?.name}` : "favorites_guest";

  // Load favorites from localStorage once client-side
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(storageKey);
    setFavorites(stored ? JSON.parse(stored) : []);
  }, [storageKey]);

  const toggleFavorite = (movieId: string) => {
    if (typeof window === "undefined") return;

    // Always read latest from localStorage
    const stored = localStorage.getItem(storageKey);
    const current: string[] = stored ? JSON.parse(stored) : [];

    const updated = current.includes(movieId)
      ? current.filter(id => id !== movieId)
      : [...current, movieId];

    localStorage.setItem(storageKey, JSON.stringify(updated));
    setFavorites(updated);
  };

  const isFavorite = (movieId: string) => favorites.includes(movieId);

  return { favorites, toggleFavorite, isFavorite };
}
