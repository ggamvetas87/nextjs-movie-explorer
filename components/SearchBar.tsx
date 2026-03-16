"use client";

import { useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useMovies } from "@/context/MoviesContext";
import MovieCardSkeleton from "@/components/cards/MovieCardSkeleton";

export default function SearchBar({ onSearch }: { onSearch: (query: string) => Promise<void> }) {
    const { loading, setLoading, query, setQuery, setMovies } = useMovies();
    const debouncedQuery = useDebounce(query);

    useEffect(() => {
        if (debouncedQuery) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    await onSearch(debouncedQuery);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
        else if (query === "") {
            setLoading(false);
            setQuery("");
            setMovies([]);
        }
    }, [debouncedQuery]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        onSearch(query).finally(() => setLoading(false));
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
                className="border p-2 rounded w-full"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies..."
            />

            <button className="bg-red-500 text-white px-4 py-2 rounded">
                Search
            </button>
            </form>

            {loading && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <MovieCardSkeleton key={i} />
                ))}
                </div>
            )}
        </div>
    );
}