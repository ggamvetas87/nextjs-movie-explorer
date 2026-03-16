import MovieCarousel from "@/components/sliders/MovieCarousel";
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
            <MovieCarousel movies={movies} />
        </section>
    );
}
