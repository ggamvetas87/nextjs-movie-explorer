import { searchMovies } from "@/lib/api";
import { Actor, Crew, Video } from "@/types/thmdb";

export async function loadMovies(query: string, page: number = 1, limit: number = 8) {
    const data = await searchMovies(query, page, limit);
    return data?.movies;
}

export function getMovieYear(releaseDate: string) {
    if (!releaseDate) return "N/A";
    return new Date(releaseDate).getFullYear();
}

export function renderCategoriesAsString(categories: { name: string }[]) {
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

export function getActors(data: Actor[], limit: number = 5) {
    return data.slice(0, limit).map((person: Actor) => ({
        id: person.id,
        name: person.name,
        imgUrl: person.profile_path,
        character: person.character,
        url: person.id && `https://www.themoviedb.org/person/${person.id}`
    }));
}

export function getCrewByJob(
{
    data,
    limit = 5,
    role = "Director"
} : {
    data: Crew[];
    limit: number;
    role: string;
}) {
    return data.slice(0, limit).filter((member: Crew) => member.job === role).map((person: Crew) => ({
        id: person.id,
        name: person.name,
        imgUrl: person.profile_path,
        role: person.job,
        url: person.id && `https://www.themoviedb.org/person/${person.id}`
    }));
}

export type TruncateOptions = {
  maxChars?: number;
  maxWords?: number;
  suffix?: string;
};

export function truncate(
  text: string,
  { maxChars, maxWords, suffix = "..." }: TruncateOptions
): string {
  if (!text) return "";

  if (maxWords) {
    const words = text.split(/\s+/);
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + suffix;
    }
  }

  if (maxChars && text.length > maxChars) {
    return text.slice(0, maxChars).trimEnd() + suffix;
  }

  return text;
}

export function parseMovieSlug(slug: string) {
  const parts = slug.split("-");

  const idPart = parts.pop();
  const id = idPart ? Number(idPart) : Number.NaN;

  const genre = parts.join("-");

  return { genre, id };
}
