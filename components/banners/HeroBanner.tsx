import Image from "next/image";
import { MovieListItem } from "@/types/thmdb";
import CustomLink from "@/components/interactions/CustomLink";
import { getMovieYear, truncate } from "@/lib/helpers";

export default function HeroBanner({ movie }: { movie: MovieListItem }) {
  const posterUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/original/${movie?.backdrop_path ?? movie?.poster_path}`;

  return posterUrl && movie?.id && (
    <div 
      className="flex-[0_0_100%] relative"
      style={{ background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))" }}
    >
      <Image
        src={posterUrl}
        alt={movie?.title}
        className="w-full h-[420px] object-cover"
        width={1200}
        height={550}
      />
      <div className="absolute bottom-8 left-8 text-white">
      <h2 className="text-4xl font-bold bg-black bg-opacity-45 px-3 py-2 rounded">
        {movie?.title}
      </h2>
      <p>{getMovieYear(movie?.release_date)}</p>
      {/* <p>{truncate(movie?.overview, { maxWords: 50 })}</p> */}
      <CustomLink href={`/movie/${movie.id}`} className="mt-4" type="button">
        View Details
      </CustomLink>
      </div>
    </div>
  );
}
