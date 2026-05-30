"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function HeroText() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Stagger in animation for the elements on page load
    const elements = container.children;
    gsap.fromTo(
      elements,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: "power3.out",
        delay: 0.5 
      }
    );
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col justify-center h-full max-w-2xl px-6 md:px-12 z-10"
    >
      {/* Availability Label */}
      <div className="flex items-center gap-3 mb-6">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-green"></span>
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
          Available for projects
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="font-bebas text-7xl md:text-8xl lg:text-[110px] leading-[0.85] tracking-wide mb-2 text-text-primary">
        YOUR IDEA,
      </h1>
      <h1 className="font-bebas text-7xl md:text-8xl lg:text-[110px] leading-[0.85] tracking-wide mb-8 text-accent-orange">
        SHIPPED.
      </h1>

      {/* Body Copy */}
      <p className="font-dm text-lg md:text-xl text-text-muted max-w-md mb-10 leading-relaxed">
        We design and engineer digital products that don&apos;t just work — they convert.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap items-center gap-6">
        <a 
          href="#contact"
          className="group relative px-7 py-3.5 rounded-full border border-accent-orange font-syne text-sm font-semibold overflow-hidden transition-colors cursor-none"
        >
          <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
            <span className="text-accent-orange group-hover:text-black transition-colors">→</span> 
            Start a Project
          </span>
          <div className="absolute inset-0 bg-accent-orange translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </a>
        
        <a 
          href="#work"
          className="group flex items-center gap-2 font-syne text-sm font-medium text-text-muted hover:text-text-primary transition-colors cursor-none"
        >
          View Work
          <span className="group-hover:translate-y-1 transition-transform duration-300">↓</span>
        </a>
      </div>
    </div>
  );
}
