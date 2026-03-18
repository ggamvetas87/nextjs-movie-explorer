import { Metadata } from 'next';
import Image from "next/image";
import { getMovie } from "@/lib/api";
import CustomLink from "@/components/interactions/CustomLink";
import VideoPlayer from "@/components/media/VideoPlayer";
import NotFound from "@/components/partial/NotFound";
import Footer from '@/components/partial/Footer';
import { Person } from "@/types/movies";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;
  const data = await getMovie(id);
  const movie = data?.short;

  if (!movie) {
    return {
      title: "Movie not found",
      description: "The movie you are looking for does not exist."
    };
  }

  return {
    title: movie.name,
    description: movie.description,
  };
}

export default async function MoviePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await getMovie(id);
  const movie = data?.short;

  if (!movie) {
    return <NotFound />;
  }

  return (
    <>
      <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-6">
        <CustomLink href="/" type="button">
          &larr; Back to search
        </CustomLink>
      </div>

      <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          {movie?.image && (
            <Image 
              src={movie.image}
              alt={movie.name} 
              className="mb-4"
              width={300}
              height={600}
            />
          )}
        </div>

        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold">{movie?.name}</h1>
          <p className="mt-2"><strong>Content Rating:</strong> {movie?.contentRating} - {movie?.aggregateRating?.ratingValue}</p>
          {movie?.duration && <p className="mt-2"><strong>Duration:</strong> {movie.duration.replace("PT", "").replace("H", "h ").replace("M", "m")}</p>}
          <p className="mt-0"><strong>Categories:</strong> {movie?.genre?.join(", ")}</p>
          <p className="mt-4">{movie?.description}</p>

          {movie?.actor?.length && (
            <div className="mt-4">
              <h4 className="text-xl font-semibold mb-2">Starring:</h4>
              <ul className="list-disc list-inside">
                {movie.actor.map((actor: Person, index: number) => (
                  <li key={index}>
                    <CustomLink target="_blank" href={actor?.url ?? "#"}>
                      {actor.name} {actor?.url && <span>&rarr;</span>}
                    </CustomLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {movie?.director?.length && (
            <div className="mt-4">
              <h4 className="text-xl font-semibold mb-2">Directors:</h4>
              <ul className="list-disc list-inside">
                {movie.director.map((director: Person, index: number) => (
                  <li key={index}>
                    <CustomLink target="_blank" href={director?.url ?? "#"}>
                      {director.name} {director?.url && <span>&rarr;</span>}
                    </CustomLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p>
            <CustomLink 
              target="_blank"
              href={movie?.url ?? "#"}
              type="button"
              className="mt-6"
            >
              More details &rarr;
            </CustomLink>
          </p>
        </div>
      </div>

      {movie?.trailer?.url && (
        <div className="max-w-5xl mx-auto p-6 gap-6">
          <div>
            <h4 className="text-2xl font-bold mb-4 text-center">
              {movie?.trailer?.name}
            </h4>
            <p className="mb-4 text-center">
              {movie?.trailer?.description}
            </p>
          </div>
          <VideoPlayer 
            url={movie?.trailer?.url}
            title={movie?.trailer?.name}
            thumbnaillUrl={movie?.trailer?.thumbnaillUrl}
            className="max-w-3xl"
          />
        </div>
      )}
      <Footer />
    </>
  );
}
