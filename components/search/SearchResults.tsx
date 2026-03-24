import MovieCard from "@/components/cards/MovieCard";
import { useMovies } from "@/context/MoviesContext";
import useDebounce from "@/hooks/useDebounce";
import { MovieListItem } from "@/types/thmdb";

export default function SearchResults({ 
  query,
  movies,
  page,
  totalResults
}: { 
  query?: string,
  movies: MovieListItem[],
  page: number,
  totalResults: number
}) {
  const { query: queryFromCtx } = useMovies();
  const debouncedQuery = useDebounce(queryFromCtx);

  let text = null;
  
  if (debouncedQuery && movies?.length === 0) {
    text = `No results found for "${debouncedQuery}"`;
  }

  if (debouncedQuery && movies?.length > 0) {
    text = `Results for "${debouncedQuery}":`;
  }

    return movies && (
      <>
        {debouncedQuery && <div className="flex items-center mb-4 justify-between">
          {text && <h4 className="text-1xl">{text}</h4>}
          {totalResults > 0 && <p className="text-sm text-gray-500">{`Showing ${movies.length} of ${totalResults} results`}</p>}
        </div>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </>
    );
}