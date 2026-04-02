import { NextRequest } from "next/server";
import { tmdbCall } from "@/lib/server/services";
import { MovieResults } from "@/types/thmdb";

export async function GET(
  req: NextRequest, 
  { params }: { params: Promise<{ time: string }> }
) {
  // Default to "day" if time parameter is not provided
  // valid values for time are "day" and "week"
  const { time } = await params;
  const { searchParams } = new URL(req?.url);
  const language = searchParams.get("language") || "en-US";

  const data: MovieResults = await tmdbCall(`trending/movie/${time ?? "day"}`, {
      params: {
        language
      },
      revalidate: 3600, // cache results for 1 hour
      tags: [`trending-${time ?? "day"}`],
      errorMessage: `Failed to fetch trending movies for time "${time ?? "day"}"`
    });

  return Response.json(data);
}
