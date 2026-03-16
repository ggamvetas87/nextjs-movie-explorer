export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("q") || "";
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 8);

  const res = await fetch(
    `https://imdb.iamidiotareyoutoo.com/search?q=${query}`
  );

  const data = await res.json();

  const movies = data.description || [];

  const start = (page - 1) * limit;
  const end = start + limit;

  return Response.json({
    results: movies.slice(start, end),
    hasMore: end < movies.length
  });
}
