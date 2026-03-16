import { searchMovies } from "@/lib/api";

export async function loadMovies(query: string, page: number = 1, limit: number = 8) {
    const data = await searchMovies(query, page, limit);
    
    return data?.movies;
}
