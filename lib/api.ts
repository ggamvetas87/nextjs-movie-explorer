export function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  return process.env.BASE_URL || "http://localhost:3000";
}

const BASE_URL = getBaseUrl();

export async function searchMovies(query: string, page: number = 1, limit: number = 99999) {
  const controller = new AbortController();
  const signal = controller.signal;

  const res = await fetch(
    `${BASE_URL}/api/movie/search/${query}?page=${page}`,
    { signal }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await res.json();

  return {
    movies: data.results ? data.results.slice(0, limit) : [],
    hasMore: data.hasMore
  };
}

export async function getMovie(id: string, extraFields?: string) {
    const res = await fetch(`${BASE_URL}/api/movie/${id}/details?extra_fields=${extraFields}`);

    if (!res.ok) {
        throw new Error("Failed to fetch movie details");
    }

    return res.json();
}

export async function getTrendingMovies(time: "day" | "week" = "day", limit: number = 20) {
  const res = await fetch(`${BASE_URL}/api/movie/trending/${time}`);

  if (!res.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = await res.json();
  return data.results ? data.results.slice(0, limit) : [];
}

export async function getMovieTagList(tag: string, limit: number = 20) {
  const res = await fetch(`${BASE_URL}/api/movie/${tag}`);

  if (!res.ok) {
    throw new Error("Failed to fetch movie list");
  }

  const data = await res.json();
  return data.results ? data.results.slice(0, limit) : [];
}

export async function getSimilarMovies(id: string, limit: number = 20) {
  const res = await fetch(`${BASE_URL}/api/movie/${id}/similar`);

  if (!res.ok) {
    throw new Error("Failed to fetch similar movies");
  }

  const data = await res.json();
  return data.results ? data.results.slice(0, limit) : [];
}
