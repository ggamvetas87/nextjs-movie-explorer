export async function searchMovies(
  query: string,
  {
    page = 1,
    limit = 99999,
    origin
  }: {
    page?: number;
    limit?: number;
    origin?: string;
  }
) {
  const controller = new AbortController();
  const signal = controller.signal;

  const res = await fetch(
    `${origin ?? ""}/api/movie/search/${query}?page=${page}`,
    { signal }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await res.json();

  return {
    movies: data.results ? data.results.slice(0, limit) : [],
    totalResults: data.totalResults ?? 0,
    hasMore: data.hasMore ?? false
  };
}

export async function getMovie(
  id: string | number,
  {
    extraFields,
    origin
  }: {
    extraFields?: string;
    origin?: string
  }) {
  const res = await fetch(`${origin ?? ""}/api/movie/${id}/details?extra_fields=${extraFields}`);

  if (!res.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return res.json();
}

export async function getTrendingMovies(time: "day" | "week" = "day", limit: number = 20) {
  const res = await fetch(`/api/movie/trending/${time}`);

  if (!res.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = await res.json();
  return data.results ? data.results.slice(0, limit) : [];
}

export async function getFavoriteMovies(ids: string[] = [], limit: number = 99999) {
  const res = await fetch(`/api/movie/favorites?ids=${ids.join(",")}`);

  if (!res.ok) {
    throw new Error("Failed to fetch favorite movies");
  }

  const data = await res.json();

  return {
    movies: data.results ? data.results.slice(0, limit) : [],
    totalResults: data.totalResults ?? 0
  };
}

export async function getMovieTagList(tag: string, limit: number = 20) {
  const res = await fetch(`/api/movie/${tag}`);

  if (!res.ok) {
    throw new Error("Failed to fetch movie list");
  }

  const data = await res.json();
  return data.results ? data.results.slice(0, limit) : [];
}

export async function getSimilarMovies(
  id: string,
  {
    limit = 20,
    origin
  }: {
    limit?: number;
    origin?: string
  }
) {
  const res = await fetch(`${origin ?? ""}/api/movie/${id}/similar`);

  if (!res.ok) {
    throw new Error("Failed to fetch similar movies");
  }

  const data = await res.json();
  return data.results ? data.results.slice(0, limit) : [];
}

export async function getCategoryMovies(
  genres: string,
  {
    page = 1,
    limit = 99999,
    origin
  }: {
    page?: number;
    limit?: number;
    origin?: string;
  }
) {
  const controller = new AbortController();
  const signal = controller.signal;

  const res = await fetch(
    `${origin ?? ""}/api/movie/discover?genres=${genres}&page=${page}`,
    { signal }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category movies");
  }

  const data = await res.json();

  return {
    movies: data.results ? data.results.slice(0, limit) : [],
    totalResults: data.totalResults ?? 0,
    hasMore: data.hasMore ?? false
  };
}
