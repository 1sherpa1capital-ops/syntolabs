"use client";

import { useState, useEffect, useRef } from "react";

export function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const position = ((clientX - rect.left) / rect.width) * 100;
      setSliderPosition(Math.min(Math.max(position, 0), 100));
    };

    const handleUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleUp);
      document.addEventListener("touchmove", handleMove);
      document.addEventListener("touchend", handleUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleUp);
    };
  }, [isDragging]);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] overflow-hidden rounded-sm border border-zinc-800 cursor-ew-resize select-none">
      {/* Before side (full) */}
      <div className="absolute inset-0 bg-zinc-950">
        <div className="absolute top-4 left-4 px-3 py-1 bg-red-500/20 text-red-400 text-xs font-mono uppercase">
          Before
        </div>
        <div className="p-8 h-full flex flex-col justify-center">
          <div className="space-y-6">
            <div className="flex items-center justify-between py-3 border-b border-zinc-800">
              <span className="text-zinc-500">Error Rate</span>
              <span className="text-red-500 font-medium text-xl">40%</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-zinc-800">
              <span className="text-zinc-500">Time per Task</span>
              <span className="text-zinc-400 text-xl">5 hours</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-zinc-800">
              <span className="text-zinc-500">Volume/Day</span>
              <span className="text-zinc-400 text-xl">12</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-zinc-500">Weekly Cost</span>
              <span className="text-red-500 font-medium text-xl">$2,400</span>
            </div>
          </div>
        </div>
      </div>

      {/* After side (clipped) */}
      <div
        className="absolute inset-0 bg-zinc-950"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <div className="absolute top-4 right-4 px-3 py-1 bg-accent/20 text-accent text-xs font-mono uppercase">
          After
        </div>
        <div className="p-8 h-full flex flex-col justify-center">
          <div className="space-y-6">
            <div className="flex items-center justify-between py-3 border-b border-zinc-800">
              <span className="text-zinc-500">Error Rate</span>
              <span className="text-accent font-medium text-xl">0%</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-zinc-800">
              <span className="text-zinc-500">Time per Task</span>
              <span className="text-accent font-medium text-xl">2.4 sec</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-zinc-800">
              <span className="text-zinc-500">Volume/Day</span>
              <span className="text-accent font-medium text-xl">500+</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-zinc-500">Weekly Cost</span>
              <span className="text-accent font-medium text-xl">$47</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-accent cursor-ew-resize flex items-center justify-center"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 text-xs font-mono text-zinc-600">
        Drag to compare →
      </div>
    </div>
  );
}
