import { searchMovies } from "@/lib/api";
import { Video } from "@/types/movies";

export async function loadMovies(query: string, page: number = 1, limit: number = 8) {
    const data = await searchMovies(query, page, limit);
    return data?.movies;
}

export function getMovieYear(releaseDate: string) {
    if (!releaseDate) return "N/A";
    return new Date(releaseDate).getFullYear();
}

export function renderCategories(categories: { name: string }[]) {
    if (!categories || categories.length === 0) return null;

    return categories.map(category => category.name).join(", ");
}

export function getVideosByType(
  videos: Video[],
  types: string | string[],
  max?: number
): Video[] {
  const typeArray = Array.isArray(types) ? types : [types];

  const filtered = videos.filter(video =>
    typeArray.includes(video.type.toLowerCase())
  );

  return typeof max === "number" ? filtered.slice(0, max) : filtered;
}

export function formatRuntime(minutes: number): string {
  if (!minutes || minutes < 0) return "0h 0min";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours}h ${mins}min`;
}
