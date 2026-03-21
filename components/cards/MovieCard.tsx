import Link from "next/link";
import Image from "next/image";
import useFavorites from "@/hooks/useFavorites";
import CustomLink from "@/components/interactions/CustomLink";
import { MovieListItem } from "@/types/thmdb";

export default function MovieCard({ movie }: { movie: MovieListItem }) {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.find(
    (m) => m.id === movie.id
  );
  const posterUrl = `${movie?.poster_path ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/w500/${movie.poster_path}` : "/assets/no-image-placeholder.png"}`;

  return (
    <div className="relative">
      <Link href={`/movie/${movie.id}`}>
        <div className="p-3 hover:shadow group cursor-pointer">
          {posterUrl && (
            <Image
              src={posterUrl}
              alt={movie?.title}
              className="
                w-full 
                mb-2 
                rounded
                transition
                duration-300
                group-hover:scale-110
              "
              width={200}
              height={300}
            />
          )}
          <h3 className="font-bold">{movie?.title}</h3>
          <p>{movie?.release_date && new Date(movie.release_date).toLocaleDateString()}</p>
        </div>
      </Link>
      <CustomLink
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            toggleFavorite(movie);
        }}
        className="mt-2 text-sm text-red-500"
      >
        {isFavorite ? "❤️" : "🤍"} Favorite
      </CustomLink>
    </div>
  );
}
