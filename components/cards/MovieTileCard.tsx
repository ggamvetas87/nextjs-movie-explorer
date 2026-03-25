import Link from "next/link";
import Image from "next/image";
import CustomLink from "@/components/interactions/CustomLink";
import ToggleFavoriteButton from "@/components/interactions/ToggleFavoriteButton";
import { truncate } from "@/lib/helpers";
import { MovieListItem } from "@/types/thmdb";

export default function MovieTileCard({ movie }: { movie: MovieListItem }) {
  const posterUrl = movie?.poster_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500/${movie.poster_path}`
    : "/assets/no-image-placeholder.png";
  const movieSlug = `${movie.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${movie.id}`;

  return (
    <div className="
      relative
      border-2 border-white rounded
      overflow-hidden
    ">
      <div className="flex flex-row">
        <Link href={`/movie/${movieSlug}`}> 
          <Image
            src={posterUrl}
            alt={movie?.title}
            className="w-full object-cover max-h-70 transition duration-300"
            width={300}
            height={500}
          />
        </Link>
        <div className="w-full p-3 group">
          <h3 className="font-bold text-red-500">{movie?.title}</h3>
          <p>{movie?.release_date && new Date(movie.release_date).toLocaleDateString()}</p>
          <div className="mb-3">
            <ToggleFavoriteButton id={movie.id} />
          </div>

          <p className="
            h-[55px]
            text-ellipsis
            md:h-auto lg:h-auto
            overflow-hidden
            text-sm
            md:text-base lg:text-base
          ">{movie?.overview && truncate(movie.overview, { maxWords: 50 })}</p>
          <CustomLink 
            href={`/movie/${movieSlug}`}
            type="button"
            className="mt-3"
          >
            View Details
          </CustomLink>
        </div>
      </div>
    </div>
  );
}
