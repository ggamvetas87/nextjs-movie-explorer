import Image from "next/image";
import { MovieListItem } from "@/types/movies";

export default function HeroBanner({ movie }: { movie: MovieListItem }) {
  return (
    <div className="relative mb-12">
      <Image
        src={movie["#IMG_POSTER"]}
        alt={movie["#TITLE"]}
        className="w-full h-[400px] object-cover rounded"
        width={1200}
        height={550}
      />
      <div className="absolute bottom-6 left-6 text-white">
        <h1 className="text-4xl font-bold">
          {movie["#TITLE"]}
        </h1>
        <p>{movie["#YEAR"]}</p>
      </div>
    </div>
  );
}
