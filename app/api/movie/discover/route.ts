import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req?.url);

  const genres = searchParams.get("genres");
  const language = searchParams.get("language") || "en-US";
  const includeAdult = searchParams.get("includeAdult") === "true";
  const page = Number(searchParams.get("page") || 1);

  if (!genres) {
    return Response.json({ error: "Missing category ID" }, { status: 400 });
  }

  const res = await fetch(
    `${process.env.TMDB_BASE_URL}/discover/movie?with_genres=${genres}&language=${language}&include_adult=${includeAdult}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
      next: { revalidate: 3600 },
    }
  );

  const data = await res.json();
  const movies = data.results || [];

  return Response.json({
    page,
    results: movies,
    totalResults: data.total_results,
    hasMore: page < data.total_pages
  });
}
