"use client";

import { useEffect, useState } from "react";

const terminalLines = [
  { text: "$ synto audit --company b2b-saas", delay: 0 },
  { text: "→ Analyzing workflows...", delay: 1500 },
  { text: "  Found 3 high-impact opportunities:", delay: 2500 },
  { text: "    1. Lead enrichment (23hrs/week)", delay: 3500 },
  { text: "    2. Client onboarding (12hrs/week)", delay: 4000 },
  { text: "    3. Invoice processing (8hrs/week)", delay: 4500 },
  { text: "", delay: 5000 },
  { text: "$ synto build --priority lead-enrichment", delay: 5500 },
  { text: "→ Building automation...", delay: 6500 },
  { text: "  [████████████] 100%", delay: 7500 },
  { text: "→ Testing with live data...", delay: 8000 },
  { text: "  ✓ 47 leads enriched", delay: 8500 },
  { text: "  ✓ 0 hallucinations detected", delay: 9000 },
  { text: "  ✓ Ready for deployment", delay: 9500 },
  { text: "", delay: 10000 },
  { text: "→ Automation running. 23hrs saved this week.", delay: 10500 },
];

export function TerminalAnimation() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentLineIndex < terminalLines.length) {
        const line = terminalLines[currentLineIndex];
        setLines((prev) => [...prev, line.text]);
        setCurrentLineIndex((prev) => prev + 1);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [currentLineIndex]);

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border-b border-zinc-800">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-zinc-500 font-mono">synto-cli</span>
      </div>
      {/* Terminal body */}
      <div className="p-4 h-[280px] overflow-y-auto font-mono text-xs">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`${
              line.startsWith("→")
                ? "text-accent"
                : line.startsWith("  ✓")
                ? "text-green-500"
                : line.startsWith("  [")
                ? "text-blue-400"
                : line.startsWith("$")
                ? "text-white"
                : "text-zinc-400"
            } ${line === "" ? "h-4" : "h-5"}`}
          >
            {line}
          </div>
        ))}
        <div className="h-5 animate-pulse">
          <span className="text-accent">▋</span>
        </div>
      </div>
    </div>
  );
}
