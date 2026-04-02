import { NextRequest } from "next/server";
import { tmdbCall } from "@/lib/server/services";
import { MovieListItem } from "@/types/thmdb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req?.url);

  const language = searchParams.get("language") || "en-US";
  const idsAsString = searchParams.get("ids") || "";
  const movieIds = idsAsString.split(",").map((id) => id.trim());

  if (!Array.isArray(movieIds)) return Response.json({ error: "Invalid movieIds" }, { status: 400 });

  try {
    const results = await Promise.all(
      movieIds.map((id) =>
        tmdbCall(`/movie/${id}`, {
          params: {
            language,
            revalidate: 3600 // cache results for 1 hour
          },
          errorMessage: `Failed to fetch movie details for movie with id "${id}"`
        }).then(r => (r as unknown as MovieListItem))
      )
    );

    return Response.json({
        results,
        totalResults: results.length
    });
  } catch (err) {
    return Response.json({ error: (err as Error)?.message }, { status: 500 });
  }
}
