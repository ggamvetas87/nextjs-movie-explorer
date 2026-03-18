export type MovieListItem = {
    "#IMDB_ID": string;
    "#TITLE": string;
    "#YEAR": string;
    "#RANK": number;
    "#ACTORS": string;
    "#AKA": string;
    "#IMDB_URL": string;
    "#IMDB_IV": string;
    "#IMG_POSTER": string;
    "photo_width": number;
    "photo_height": number
};

export type Person = {
    type: string;
    url: string;
    name: string;
};

export type Category = string;
