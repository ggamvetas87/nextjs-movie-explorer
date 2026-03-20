import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(req?.url);
  const language = searchParams.get("language") || "en-US";
  const extraFields = searchParams.get("extra_fields");

  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }
  
  const res = await fetch(
    `${process.env.TMDB_BASE_URL}/movie/${id}?language=${language}&append_to_response=${extraFields}`,
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
