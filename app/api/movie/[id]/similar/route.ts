import { NextRequest } from "next/server";
import { tmdbCall } from "@/lib/server/services";
import { MovieResults } from "@/types/thmdb";

export async function GET(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(req?.url);
  const language = searchParams.get("language") || "en-US";

  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }

  const data: MovieResults = await tmdbCall(`/movie/${id}/similar`, {
      params: {
        language,
        revalidate: 3600 // cache results for 1 hour
      },
      tags: [`similar-${id}`],
      errorMessage: `Failed to fetch similar movies for movie with id "${id}"`
    });

  return Response.json(data);
}
