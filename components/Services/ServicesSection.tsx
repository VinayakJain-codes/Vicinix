"use client";

import { useEffect, useRef } from "react";
import ServicesGrid from "./ServicesGrid";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const line = lineRef.current;
    
    if (!section || !heading || !line) return;

    // 1. Text Split Wipe Animation
    // We target the individual span elements created for each letter
    gsap.fromTo(
      ".char-reveal",
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.05, // wipe from left to right
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );

    // 2. Sweeping Orange Line Transition at bottom
    gsap.fromTo(
      line,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: section,
          start: "bottom 95%", // Trigger when scrolling out of section
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === heading || st.vars.trigger === section) {
          st.kill();
        }
      });
    };
  }, []);

  // Split the heading text into an array of letters for animation
  const splitText = (text: string) => {
    return text.split("").map((char, index) => {
      if (char === " ") return <span key={index}>&nbsp;</span>;
      return (
        <span key={index} className="char-reveal inline-block opacity-0">
          {char}
        </span>
      );
    });
  };

  return (
    <section ref={sectionRef} id="services" className="relative min-h-screen w-full bg-bg-primary flex flex-col items-center pt-32 pb-48 px-6 md:px-12 lg:px-24 z-20">
      
      {/* Cinematic Letterbox Bars (Top & Bottom) for the cut from Hero */}
      <div className="absolute top-0 left-0 w-full h-12 md:h-24 bg-black z-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-12 md:h-24 bg-black z-30 pointer-events-none" />

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto z-10 flex flex-col items-center">
        
        {/* Section Heading */}
        <div className="mb-16 md:mb-24 text-center">
          <h2 ref={headingRef} className="font-bebas text-5xl md:text-7xl lg:text-[90px] tracking-wide mb-6">
            <span className="text-text-primary">
              {splitText("WHAT WE ")}
            </span>
            <span className="text-accent-green">
              {splitText("BUILD")}
            </span>
          </h2>
          <p className="font-dm text-text-muted max-w-2xl mx-auto text-lg md:text-xl">
            We deliver end-to-end digital experiences built for scale, performance, and aesthetic dominance.
          </p>
        </div>

        {/* Services Grid */}
        <ServicesGrid />
        
      </div>

      {/* Outro Transition - Sweeping Orange Line */}
      <div 
        ref={lineRef}
        className="absolute bottom-32 left-0 w-full h-[2px] bg-accent-orange z-20 shadow-[0_0_15px_rgba(249,115,22,0.5)]"
      />
      
    </section>
  );
}
