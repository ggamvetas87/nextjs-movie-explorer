export type Category = string;

export type Video = {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
};

export type Credit = {
    id: string;
    name: string;
    gender: number;
    profile_path: string;
    credit_id: string;
    order: number;
    original_name: string;
    character: string;
    known_for_department: string;
    popularity: number;
    adult: boolean;
    url?: string;
};

export type Actor = Credit & {
    cast_id: number;
    order: number;
    character: string;
};

export type Crew = Credit & {
    job: string;
    department: string;
};

export type Person = {
    id: string;
    name: string;
    imgUrl: string;
    url?: string;
    role?: string;
    character?: string;
};

export type MovieListItem = {
    id: string;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    backdrop_path?: string;
    popularity: number;
    genre_ids: number[];
    genres?: { id: number; name: string }[];
    runtime: number;
    vote_average: number;
    vote_counts: number;
    adult: boolean;
    video: boolean;
    videos?: {
        results: Video[];
    };
    credits?: {
        cast: Actor[];
        crew: Crew[];
    };
};

export type MovieResults = {
    results: MovieListItem[];
    total_results: number;
    total_pages: number;
};