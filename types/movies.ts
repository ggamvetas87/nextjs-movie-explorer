export type MovieListItem = {
    id: string;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    backdrop_path?: string;
    popularity: number;
    genre_ids: number[];
    vote_average: number;
    vote_counts: number;
    adult: boolean;
};

export type Person = {
    type: string;
    url: string;
    name: string;
};

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
