export function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  return process.env.BASE_URL || "http://localhost:3000";
}

const BASE_URL = getBaseUrl();

export async function searchMovies(query: string, page: number = 1, limit: number = 8) {
  const controller = new AbortController();
  const signal = controller.signal;

  const res = await fetch(
    `${BASE_URL}/api/movies?q=${query}&page=${page}&limit=${limit}`,
    { signal }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await res.json();

  return {
    movies: data.results || [],
    hasMore: data.hasMore
  };
}

export async function getMovie(id: string) {
    const res = await fetch(`${BASE_URL}/api/movie?tt=${id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch movie");
    }

    return res.json();
}
