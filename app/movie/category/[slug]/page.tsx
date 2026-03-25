import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryMovies } from "@/lib/api";
import CustomLink from "@/components/interactions/CustomLink";
import MovieTileCard from "@/components/cards/MovieTileCard";
import Pagination from "@/components/interactions/Pagination";
import { parseMovieSlug } from "@/lib/helpers";
import { MovieListItem } from "@/types/thmdb";

function formatGenre(genre: string) {
  return genre
    .split("-")
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const { genre, id } = parseMovieSlug(slug);

  const data = await getCategoryMovies(id?.toString());
  const { movies } = data;

  if (!movies || movies?.length === 0) {
    return {
      title: "Movies not found",
      description: "The movies you are looking for do not exist."
    };
  }

  return {
    title: `Movies in category ${genre}`,
    description: `A list of movies in the ${genre} category.`,
  };
}

export default async function CategoryPage({ 
  params,
  searchParams
 }: { 
  params: { slug: string }, 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  const [{ slug }, { page: pageParam }] = await Promise.all([params, searchParams]);

  const { genre, id } = parseMovieSlug(slug);
  const page = Number(pageParam ?? "1");
  const data = await getCategoryMovies(id?.toString(), page);
  const { movies, totalResults } = data;

  if (!movies || movies?.length === 0 || Number.isNaN(id)) {
    return notFound();
  }

  return (
    <>
      <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-6">
        <CustomLink href="/" type="button">
          &larr; Back to Home
        </CustomLink>
      </div>

      <div className="max-w-5xl mx-auto p-6 flex flex-col gap-6">
        <h2 className="text-2xl font-bold">{formatGenre(genre)}</h2>
        
        <Pagination
          currentPage={page}
          totalResults={totalResults}
          slug={slug}
        />

        {movies.map((movie: MovieListItem) => (
          <MovieTileCard key={movie.id} movie={movie} />
        ))}

        <Pagination
          currentPage={page}
          totalResults={totalResults}
          slug={slug}
        />
      </div>
    </>
  );
}
