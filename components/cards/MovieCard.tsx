import Link from "next/link";
import Image from "next/image";
import useFavorites from "@/hooks/useFavorites";
import CustomLink from "@/components/interactions/CustomLink";
import { MovieListItem } from "@/types/movies";

export default function MovieCard({ movie }: { movie: MovieListItem }) {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.find(
    (m) => m["#IMDB_ID"] === movie["#IMDB_ID"]
  );

  return (
    <div className="relative">
      <Link href={`/movie/${movie["#IMDB_ID"]}`}>
        <div className="p-3 hover:shadow group cursor-pointer">
          {movie["#IMG_POSTER"] && (
            <Image
              src={movie["#IMG_POSTER"]}
              alt={movie["#TITLE"]}
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

          <h3 className="font-bold">{movie["#TITLE"]}</h3>
          <p>{movie["#YEAR"]}</p>
        </div>
      </Link>
      <CustomLink
        href="#"
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
