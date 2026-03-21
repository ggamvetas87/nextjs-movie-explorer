import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest, 
  { params }: { params: Promise<{ query: string }> }
) {
  const { query } = await params;
  const { searchParams } = new URL(req?.url);

  const language = searchParams.get("language") || "en-US";
  const includeAdult = searchParams.get("includeAdult") === "true";
  const page = Number(searchParams.get("page") || 1);

  if (!query) {
    return Response.json({ error: "Missing query" }, { status: 400 });
  }

  const res = await fetch(
    `${process.env.TMDB_BASE_URL}/search/movie?query=${query}&language=${language}&include_adult=${includeAdult}&page=${page}`,
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
