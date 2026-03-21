"use client";

import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Button from "@/components/interactions/Button";
import PersonCard from "@/components/cards/PersonCard";
import { Person } from "@/types/thmdb";

export default function PersonCarousel({ 
    people,
    count = 8,
    delay = 3000,
    showButtons = true,
    showDots = false,
    loop = true
}: { 
    people: Person[], 
    count?: number, 
    delay?: number,
    showButtons?: boolean,
    showDots?: boolean,
    loop?: boolean
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slidesToScroll, setSlidesToScroll] = useState(2);

  const [emblaRef, embla] = useEmblaCarousel(
    { loop, slidesToScroll, containScroll: "trimSnaps" }, 
    [Autoplay({ delay })]
  );

  useEffect(() => {
    if (!embla) return;

    const onSelect = () => {
      setSelectedIndex(embla.selectedScrollSnap());
    };
    embla.on("select", onSelect);
    onSelect();
  }, [embla]);

  useEffect(() => {
    const handleResize = () => {
    const width = window.innerWidth;

    if (width < 640) setSlidesToScroll(2); // mobile
    else if (width < 1024) setSlidesToScroll(3); // tablet
    else setSlidesToScroll(2); // desktop
    };

    handleResize(); // init
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!embla) return;
    embla.reInit();
  }, [slidesToScroll, embla]);

  return (
    <div className="relative">
      <div className="overflow-hidden mb-10 relative" ref={emblaRef}>
        <div className="flex">
          {people.slice(0,count).map(person => (
            <div key={person.id} className="
              flex-[0_0_60%]
              sm:flex-[0_0_50%]
              md:flex-[0_0_33%]
              lg:flex-[0_0_25%]
            ">
              <PersonCard data={person} />
            </div>
          ))}
        </div>
        {showDots && <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {people.slice(0,count).map((person, index) => (
            <Button
              key={person.id}
              importance="secondary"
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
      </div>
      {showButtons && (
          <div className="flex justify-between">
            <div className="transform -translate-y-1/2">
                <Button
                  importance="secondary"
                  className="px-2 py-1"
                  onClick={() => embla?.scrollPrev()}
                >
                  &larr; Prev
                </Button>
            </div>
            <div className="transform -translate-y-1/2">
                <Button
                  importance="secondary"
                  className="px-2 py-1"
                  onClick={() => embla?.scrollNext()}
                >
                  Next &rarr;
                </Button>
            </div>
          </div>
      )}
    </div>
  );
}
