import Homepage from "@/pageComponents/Homepage";
import {
  getTrendingMovies,
  getMovieTagList
} from "@/lib/server/utils";

type Props = {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const { query: queryParam, page: pageParam } = await searchParams;
  const query = queryParam ?? "";
  const page = Number(pageParam ?? 1);

  // Fetch hero banners, trending movies, and upcoming movies in parallel
  const [heroBanners, trending, upcoming] = await Promise.all([
    getMovieTagList("popular"),
    getTrendingMovies("day"),
    getMovieTagList("upcoming")
  ]);

  return (
    <Homepage
      initialQuery={query}
      initialPage={page}
      heroBanners={heroBanners}
      trending={trending}
      upcoming={upcoming}
    />
  );
}
