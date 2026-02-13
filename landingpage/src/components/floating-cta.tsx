"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { openCalModal } from "./cal-provider";

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await openCalModal();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="flex items-center gap-2 bg-white text-black px-6 py-3 text-sm font-medium hover:bg-zinc-200 hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)] hover:scale-[1.02] transition-all duration-200 rounded-full cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading...
          </>
        ) : (
          <>
            Book Audit
            <ArrowUpRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}
