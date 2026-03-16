import MovieCard from "./MovieCard";
import { MovieListItem } from "@/types/movies";

interface MovieRowProps {
  title: string;
  movies: MovieListItem[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4">
        {title}
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {movies.map((movie) => (
          <MovieCard key={movie["#IMDB_ID"]} movie={movie} />
        ))}
      </div>
    </section>
  );
}
