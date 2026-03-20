import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest, 
  { params }: { params: Promise<{ time: string }> }
) {
  // Default to "day" if time parameter is not provided
  // valid values for time are "day" and "week"
  const { time } = await params;
  const { searchParams } = new URL(req?.url);
  const language = searchParams.get("language") || "en-US";
  
  const res = await fetch(
    `${process.env.TMDB_BASE_URL}/trending/movie/${time ?? "day"}?language=${language}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
      next: { revalidate: 3600 },
    }
  );

  const data = await res.json();

  return Response.json(data);
}
