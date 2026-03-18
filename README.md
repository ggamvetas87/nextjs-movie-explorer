# Next.js Movie Explorer

A simple and modern demo movie search web app built with Next.js.

## Features

- Movie search
- Debounced queries
- Infinite scroll
- Loading skeletons
- Favorites with localStorage
- Movie details page

## Tech Stack

- Next.js
- React
- Tailwind CSS
- External API

## Architecture

Client-side search with debouncing and infinite scrolling to optimize API usage.

## Run locally

```bash
yarn install
yarn dev
```
## Project Structure

```
app/
├── api/
│   └── movie/
│       └── route.ts
│   └── movies/
│       └── route.ts
├── components/
│   ├── banners/
│       └── HeroBanner.tsx
│       └── ...
│   ├── cards/
│       └── MovieCard.tsx
│       └── ...
│   ├── form/
│       └── TextBox.tsx
│       └── ...
│   ├── grids/
│       └── MovieRow.tsx
│       └── ...
│   ├── interactions/
│       └── Button.tsx
│       └── ...
│   ├── media/
│       └── VideoPlayer.tsx
│       └── ...
│   ├── partial/
│       └── Header.tsx
│       └── ...
│   ├── search/
│       └── searchBar.tsx
│       └── ...
│   ├── sliders/
│       └── HeroCarousel.tsx
│       └── ...
├── pages/
│   ├── page.tsx
│   └── movie/
│       └── [id]
│           └── page.tsx
│   └── disclaimer/
│       └── page.tsx
├── hooks/
│   └── useDebounce.ts
│   └── ...
├── context/
│   └── MoviesContext.ts
└── lib/
    └── api.ts
└── types/
    └── movies.ts
```

## API Integration

This project uses the TMDB (The Movie Database) API for fetching movie data.

## Getting Started

1. Clone the repository
2. Install dependencies: `yarn install`
3. No TMDB API key is required
4. Run development server: `yarn dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Key Features Details

- **Search**: Real-time movie search with debounced queries to reduce API calls
- **Infinite Scroll**: Automatically load more results as you scroll
- **Favorites**: Save favorite movies to browser localStorage
- **Movie Details**: Click any movie to view full details on a dedicated page

## License

MIT