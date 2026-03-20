import { Metadata } from 'next';
import { notFound } from 'next/navigation'
import Image from "next/image";
import { getMovie, getSimilarMovies } from "@/lib/api";
import CustomLink from "@/components/interactions/CustomLink";
import VideoPlayer from "@/components/media/VideoPlayer";
import MovieCarousel from '@/components/sliders/MovieCarousel';
import Section from '@/components/grids/Section';
import { renderCategories, formatRuntime, getVideosByType } from "@/lib/helpers";
import { Person } from "@/types/movies";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovie(id);

  if (!movie) {
    return {
      title: "Movie not found",
      description: "The movie you are looking for does not exist."
    };
  }

  return {
    title: movie.title,
    description: movie.overview,
  };
}

export default async function MoviePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const movie = await getMovie(id, "videos");

  if (!movie) {
    return notFound();
  }

  const renderVideo = () => {
    const trailers = getVideosByType(movie.videos?.results || [], ["trailer"], 1);
    const video = trailers?.[0];

    return video?.key && (
      <div className="max-w-5xl mx-auto p-6 gap-6">
        <div>
          <h4 className="text-2xl font-bold mb-4 text-center">
            {video?.name}
          </h4>
        </div>
        <VideoPlayer 
          url={`https://www.youtube.com/watch?v=${video.key}`}
          title={video?.name}
          thumbnaillUrl={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500/${movie.backdrop_path}`}
          className="max-w-3xl"
        />
      </div>
    )};

  const renderSimilarMovies = async () => {
    const similarMovies = await getSimilarMovies(movie.id, 20);

    return similarMovies?.length && (
      <MovieCarousel key={movie.id} movies={similarMovies} count={20} />
    );
  };

  return (
    <>
      <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-6">
        <CustomLink href="/" type="button">
          &larr; Back to search
        </CustomLink>
      </div>

      <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          {movie?.poster_path && (
            <Image 
              src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500/${movie.poster_path}`}
              alt={movie.title} 
              className="mb-4"
              width={300}
              height={600}
            />
          )}
        </div>

        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold">{movie?.title}</h2>
          <p className="mt-2"><strong>Rating:</strong> <span className="text-2xl text-red-500">&#9733;</span> {movie?.vote_average.toFixed(1)}</p>
          {movie?.runtime && <p className="mt-2"><strong>Duration:</strong> {formatRuntime(movie.runtime)}</p>}
          {movie?.genres && <p className="mt-0"><strong>Categories:</strong> {renderCategories(movie.genres)}</p>}
          {movie?.release_date && <p className="mt-2"><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>}
          <p className="mt-4">{movie?.overview}</p>

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
              href={`https://www.imdb.com/title/${movie?.imdb_id}`}
              type="button"
              className="mt-6"
            >
              More details &rarr;
            </CustomLink>
          </p>
        </div>
      </div>

      {renderVideo()}
      
      <Section className="mt-4">
        <div className="max-w-5xl mx-auto mb-4">
          <h3 className="text-2xl font-bold mb-2">
            You might also like
          </h3>
          {renderSimilarMovies()}
        </div>
      </Section>
    </>
  );
}
