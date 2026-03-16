export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("tt") || "";

  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }
  
  const res = await fetch(
    `https://imdb.iamidiotareyoutoo.com/search?tt=${id}`,
    { next: { revalidate: 3600 } }
  );

  const data = await res.json();

  return Response.json(data);
}
