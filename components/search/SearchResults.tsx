import MovieCard from "@/components/cards/MovieCard";
import { MovieListItem } from "@/types/movies";

export default function SearchResults({ movies }: { movies: MovieListItem[] }) {
    return movies && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
    );
}