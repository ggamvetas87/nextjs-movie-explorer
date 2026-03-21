"use client";

import { useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useMovies } from "@/context/MoviesContext";
import Button from "@/components/interactions/Button";
import Textbox from "@/components/form/Textbox";
import MovieCardSkeleton from "@/components/cards/MovieCardSkeleton";

export default function SearchBar({ 
    onSearch,
    onClear

 }: { 
    onSearch: (query: string) => Promise<void>;
    onClear: (value?: string) => void;
}) {
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

    const handleClear = () => {
        setQuery("");
        setMovies([]);
        onClear();
    };

    return (
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm pt-0 pr-0 pb-[2px] pl-0">
            <form onSubmit={handleSubmit} className="flex gap-2 mt-3 mb-5">
                <Textbox
                    styles={{
                        input: "border p-2 rounded w-full"
                    }}
                    value={query}
                    onChange={(value) => setQuery(value)}
                    onClear={handleClear}
                    placeholder="Search movies..."
                />
                <Button type="submit" disabled={query.trim() === "" || loading}>
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