type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  params?: Record<string, string | number | undefined>;
  body?: unknown;
  headers?: HeadersInit;
  revalidate?: number;
  tags?: string[];
  errorMessage?: string;
};

export async function tmdbCall<T>(
  path: string,
  {
    method = "GET",
    params,
    body,
    headers,
    revalidate = 3600,
    tags,
    errorMessage
  }: FetchOptions = {}
): Promise<T> {

  const url = new URL(`${process.env.TMDB_BASE_URL}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const fetchOptions: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {
    method,
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      "Content-Type": "application/json",
      ...headers
    }
  };

  // body
  if (body && method !== "GET") {
    fetchOptions.body = JSON.stringify(body);
  }

  // caching ONLY for GET
  if (method === "GET") {
    fetchOptions.next = {
      revalidate,
      ...(tags ? { tags } : {})
    };
  }

  const res = await fetch(url.toString(), fetchOptions);

  if (!res.ok) {
    throw new Error(`${errorMessage ?? ""} TMDB error: ${res.status}`);
  }

  return res.json();
}
