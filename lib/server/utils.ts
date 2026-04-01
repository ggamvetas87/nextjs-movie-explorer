"use server";

import { tmdbCall } from "@/lib/server/services";
import { MovieListItem, MovieResults } from "@/types/thmdb";

export async function getMovie(
  id: string | number,
  {
    language = "en-US",
    append_to_response
  }: {
    language?: string;
    append_to_response?: string;
  } = {},
) {
  const data: MovieListItem = await tmdbCall(`/movie/${id}`, {
    params: { language, append_to_response },
    tags: [`movie-${id}`],
    errorMessage: `Failed to fetch details for movie with ID ${id}`
  });

  return data;
}

export async function getSimilarMovies(id: string | number, limit: number = 20
) {
  const data: MovieResults = await tmdbCall(`/movie/${id}/similar`, {
    params: { language: "en-US" },
    tags: [`similar-${id}`],
    errorMessage: `Failed to fetch similar movies for movie with ID ${id}`
  });

  return data.results ? data.results.slice(0, limit) : [];
}

export async function getCategoryMovies(genres: string, page: number = 1, limit: number = 99999) {
  const data: MovieResults = await tmdbCall("/discover/movie", {
    params: {
        with_genres: genres,
        language: "en-US",
        page
    },
    tags: [`category-${genres}-page-${page}`],
    errorMessage: `Failed to fetch movies for category ${genres} on page ${page}`
  });

  return {
    movies: data.results ? data.results.slice(0, limit) : [],
    totalResults: data.total_results ?? 0,
    totalPages: data.total_pages ?? 0
  };
}

export async function getTrendingMovies(
  time: "day" | "week" = "day",
    { 
    language = "en-US",
    limit = 20
}: { 
    language?: string;
    limit?: number;
} = {}) {
  const data: MovieResults = await tmdbCall(`/trending/movie/${time}`, {
    params: { language },
    tags: ["trending"],
    errorMessage: `Failed to fetch trending movies for time window ${time}`
  });

  return data.results ? data.results.slice(0, limit) : [];
}

export async function getMovieTagList(
  tag: string, 
  { 
    language = "en-US",
    limit = 20
}: { 
    language?: string;
    limit?: number;
} = {}) {
  const data: MovieResults = await tmdbCall(`/movie/${tag}`, {
    params: { language },
    tags: [tag],
    errorMessage: `Failed to fetch movies for tag ${tag}`

  });

  return data.results ? data.results.slice(0, limit) : [];
}
