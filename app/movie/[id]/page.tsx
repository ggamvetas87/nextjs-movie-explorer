import { Metadata } from 'next';
import { notFound } from 'next/navigation'
import Image from "next/image";
import { getMovie, getSimilarMovies } from "@/lib/api";
import CustomLink from "@/components/interactions/CustomLink";
import ToggleFavoriteButton from "@/components/interactions/ToggleFavoriteButton";
import VideoPlayer from "@/components/media/VideoPlayer";
import MovieCarousel from '@/components/sliders/MovieCarousel';
import PersonCarousel from '@/components/sliders/PersonCarousel';
import Section from '@/components/grids/Section';
import {
  formatRuntime,
  getVideosByType,
  getActors,
  getCrewByJob
} from "@/lib/helpers";

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
  const movie = await getMovie(id, "credits,videos");
  const posterUrl = `${movie?.poster_path ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500/${movie.poster_path}` : "/assets/no-image-placeholder.png"}`;
  const cast = movie?.credits?.cast || [];
  const crew = movie?.credits?.crew || [];
  const actors = getActors(cast, 10);
  const directors = getCrewByJob({ data: crew, limit: 5, role: "Director" });

  if (!movie) {
    return notFound();
  }

  function renderCategories(categories: { id: number; name: string }[]) {
    if (!categories || categories.length === 0) return null;

    return categories.map(category => <span key={category.id} className="text-sm bg-red-500 text-white rounded px-1 mr-2">{category.name}</span>);
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
          className="max-w-5xl"
        />
      </div>
    )};

  const renderSimilarMovies = async () => {
    const similarMovies = await getSimilarMovies(movie.id, 20);
    
    return similarMovies?.length > 0 && (
      <>
        <h3 className="text-2xl font-bold mb-2">
          You might also like
        </h3>
        <MovieCarousel key={movie.id} movies={similarMovies} count={20} />
      </>
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
          {posterUrl && (
            <Image 
              src={posterUrl}
              alt={movie.title} 
              className="mb-4 rounded"
              width={300}
              height={600}
            />
          )}
        </div>

        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold">{movie?.title}</h2>
          <ToggleFavoriteButton 
            id={movie.id}
            text={{
              active: "Remove from Favorites",
              inactive: "Add to Favorites"
            }}
          />
          
          {movie?.vote_average > 0 && <p className="mt-2"><strong>Rating:</strong> <span className="text-2xl text-red-500">&#9733;</span> {movie.vote_average.toFixed(1)}</p>}
          {movie?.runtime > 0 && <p className="mt-2"><strong>Duration:</strong> {formatRuntime(movie.runtime)}</p>}
          {movie?.genres && <p className="mt-0"><strong>Categories:</strong> {renderCategories(movie.genres)}</p>}
          {movie?.release_date && <p className="mt-2"><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>}
          <p className="mt-4">{movie?.overview}</p>

          {actors.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xl font-semibold mb-2">Starring:</h4>
              <PersonCarousel people={actors} count={10} />
            </div>
          )}

          {directors.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xl font-semibold mb-2">Directors:</h4>
              <ul className="list-disc list-inside">
                {directors.map(director => (
                  <li key={director.id}>
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
              href={`https://www.themoviedb.org/movie/${movie?.id}`}
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
          {renderSimilarMovies()}
        </div>
      </Section>
    </>
  );
}
