"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useFavorites() {
  const { data: session, status } = useSession();
  const [favorites, setFavorites] = useState<string[]>([]);

  // storageKey is derived from session status and user info to ensure each user has their own favorites list, while guests share a common list
  const storageKey = status === "authenticated" && session?.user
    ? `favorites_${session.user.email ?? session.user.name}`
    : "favorites_guest";

  // Load favorites from localStorage once session is ready
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(storageKey);
    setFavorites(stored ? JSON.parse(stored) : []);
  }, [storageKey]);

  const toggleFavorite = (movieId: string) => {
    if (typeof window === "undefined") return;

    // Read latest from localStorage
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
