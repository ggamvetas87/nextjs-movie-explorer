"use client";

import { useEffect, useState } from "react";
import Button from "@/components/interactions/Button";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="
        fixed bottom-6 right-6
        px-4 py-2 rounded-full
        shadow-lg
      "
    >
      ↑ Top
    </Button>
  );
}
