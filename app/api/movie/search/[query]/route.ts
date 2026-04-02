import { NextRequest } from "next/server";
import { tmdbCall } from "@/lib/server/services";
import { MovieResults } from "@/types/thmdb";

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

  const normalizedQuery = query?.trim().toLowerCase();

  if (!normalizedQuery || normalizedQuery.length < 2) {
    return Response.json({ results: [], page: 1, total_pages: 0, total_results: 0 }, { status: 200 });
  }

  const data: MovieResults = await tmdbCall("/search/movie", {
      params: {
        query: normalizedQuery,
        language,
        include_adult: includeAdult,
        page
      },
      revalidate: 86400, // cache results for 24 hours
      tags: [`search-${normalizedQuery}-page-${page}`],
      errorMessage: `Failed to fetch search results for query "${query}" on page ${page}`
    });

  const movies = data.results || [];

  return Response.json({
    page,
    results: movies,
    totalResults: data.total_results,
    hasMore: page < data.total_pages
  });
}
