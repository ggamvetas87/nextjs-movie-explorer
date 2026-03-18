"use client";

import { useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useMovies } from "@/context/MoviesContext";
import Button from "@/components/interactions/Button";
import Textbox from "@/components/form/Textbox";
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
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm p-4">
            <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
                <Textbox
                    styles={{
                        input: "border p-2 rounded w-full"
                    }}
                    value={query}
                    onChange={(value) => setQuery(value)}
                    placeholder="Search movies..."
                />
                <Button type="submit">
                    Search
                </Button>
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