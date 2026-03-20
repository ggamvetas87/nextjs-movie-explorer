"use client";

import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Button from "@/components/interactions/Button";
import HeroBanner from "@/components/banners/HeroBanner";
import { MovieListItem } from "@/types/movies";

export default function HeroCarousel({ 
    movies,
    count = 5,
    delay = 3000,
    showButtons = true,
    showDots = true,
    loop = true
}: { 
    movies: MovieListItem[], 
    count?: number, 
    delay?: number,
    showButtons?: boolean,
    showDots?: boolean,
    loop?: boolean
}) {
  const [emblaRef, embla] = useEmblaCarousel(
    { loop, slidesToScroll: 1 }, 
    [Autoplay({ delay })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!embla) return;

    const onSelect = () => {
        setSelectedIndex(embla.selectedScrollSnap());
    };
    embla.on("select", onSelect);
    onSelect();
  }, [embla]);

  return (
    <div className="overflow-hidden mb-10 relative" ref={emblaRef}>
      <div className="flex">
        {movies.slice(0,count).map((movie) => (
          <HeroBanner key={movie.id} movie={movie} />
        ))}
      </div>
      {showDots && <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {movies.slice(0,count).map((movie, index) => (
          <Button
            key={movie.id}
            className={`
              w-3 h-3 rounded-full transition
              ${index === selectedIndex
              ? "bg-white"
              : "bg-white/40"}
            `}
            onClick={() => embla?.scrollTo(index)}
          />
        ))}
      </div>}
      {showButtons && (
        <>
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <Button
              importance="secondary"
              className="px-2! py-1!"
              onClick={() => embla?.scrollPrev()}
            >
              &larr; Prev
            </Button>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <Button
              importance="secondary"
              className="px-2! py-1!"
              onClick={() => embla?.scrollNext()}
            >
              Next &rarr;
            </Button>
          </div>
        </>
     )}
    </div>
  );
}
