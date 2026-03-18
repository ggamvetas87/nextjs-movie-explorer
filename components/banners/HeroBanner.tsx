import Image from "next/image";
import { MovieListItem } from "@/types/movies";
import CustomLink from "@/components/interactions/CustomLink";

export default function HeroBanner({ movie }: { movie: MovieListItem }) {
  return (
    <div className="flex-[0_0_100%] relative">
      <Image
        src={movie["#IMG_POSTER"]}
        alt={movie["#TITLE"]}
        className="w-full h-[420px] object-cover"
        width={1200}
        height={550}
      />
      <div className="absolute bottom-8 left-8 text-white">
        <h2 className="text-4xl font-bold">
          {movie["#TITLE"]}
        </h2>
        <p>{movie["#YEAR"]}</p>
        <CustomLink href={`/movie/${movie["#IMDB_ID"]}`} className="mt-4" type="button">
          View Details
        </CustomLink>
      </div>
    </div>
  );
}
