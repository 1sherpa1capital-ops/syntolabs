"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Search, Zap, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Audit",
    description: "We dig into your workflows, find the time-wasters, and rank them by impact.",
    color: "bg-blue-500",
  },
  {
    icon: Zap,
    title: "Build",
    description: "You get a working prototype in 48 hours. Running code you can test.",
    color: "bg-accent",
  },
  {
    icon: Rocket,
    title: "Run",
    description: "We hand off. You run. 30-90 days of support included.",
    color: "bg-green-500",
  },
];

export function ProcessFlow() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Connection lines */}
      <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-zinc-800">
        <div
          className="absolute top-0 left-0 h-full bg-accent transition-all duration-1000"
          style={{ width: isVisible ? "100%" : "0%" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.title}
              className={`relative transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Step card */}
              <div className="relative z-10 p-8 border border-zinc-900 bg-zinc-950/50 rounded-sm hover:border-zinc-700 transition-colors group">
                {/* Number badge */}
                <div className="absolute -top-3 left-6 px-3 py-1 bg-black border border-zinc-800 text-xs font-mono text-zinc-500">
                  0{index + 1}
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-black" />
                </div>

                <h3 className="text-lg font-medium mb-3">{step.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow for mobile */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-4">
                  <ArrowRight className="w-6 h-6 text-zinc-700" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
