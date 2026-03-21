import MovieCard from "@/components/cards/MovieCard";
import { MovieListItem } from "@/types/thmdb";

export default function SearchResults({ 
  query,
  movies,
  page,
  totalResults
}: { 
  query: string,
  movies: MovieListItem[],
  page: number,
  totalResults: number
}) {
    return movies && (
      <>
        {query && <div className="flex items-center mb-4 justify-between">
          <h4 className="text-1xl">{`Results for "${query}":`}</h4>
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