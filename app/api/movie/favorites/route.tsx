import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req?.url);

  const language = searchParams.get("language") || "en-US";
  const idsAsString = searchParams.get("ids") || "";
  const movieIds = idsAsString.split(",").map((id) => id.trim());

  if (!Array.isArray(movieIds)) return Response.json({ error: "Invalid movieIds" }, { status: 400 });

  try {
    const results = await Promise.all(
      movieIds.map((id) =>
        fetch(
            `${process.env.TMDB_BASE_URL}/movie/${id}?language=${language}`,
            {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            },
            next: { revalidate: 3600 }
        }).then((r) => r.json())
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
