import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-5 right-5 z-50 p-2.5 rounded-full bg-navy/85 backdrop-blur-md text-gold border border-gold/30 shadow-lg hover:bg-gold hover:text-navy hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
    >
      <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
