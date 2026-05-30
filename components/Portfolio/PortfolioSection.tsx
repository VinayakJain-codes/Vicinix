"use client";

import { useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const PROJECTS = [
  {
    title: "Alpha Protocol",
    category: "FinTech",
    tags: ["React", "WebGL", "Dashboard"],
    imageUrl: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2070&auto=format&fit=crop",
    accentColor: "orange" as const,
  },
  {
    title: "Beta Commerce",
    category: "E-commerce",
    tags: ["Next.js", "Shopify", "Framer"],
    imageUrl: "https://images.unsplash.com/photo-1555529771-835f59bfc50c?q=80&w=2070&auto=format&fit=crop",
    accentColor: "green" as const,
  },
  {
    title: "Gamma AI",
    category: "SaaS",
    tags: ["Three.js", "Python", "UI/UX"],
    imageUrl: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2032&auto=format&fit=crop",
    accentColor: "orange" as const,
  },
  {
    title: "Delta Web3",
    category: "Crypto",
    tags: ["Solidity", "Tailwind", "DApp"],
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070&auto=format&fit=crop",
    accentColor: "green" as const,
  }
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!section || !track || prefersReducedMotion) return;

    // Calculate how far to move the track horizontally
    // We want to move it to the left by its full width minus the viewport width
    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      return -(trackWidth - window.innerWidth);
    };

    // Create the master horizontal scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`, // The pin duration matches the scroll distance
        pin: true,
        scrub: 1, // Smooth scrubbing
        invalidateOnRefresh: true, // Recalculate on resize
      }
    });

    // Animate the track moving horizontally
    tl.to(track, {
      x: getScrollAmount,
      ease: "none"
    });

    // Apply parallax to the images inside the cards
    // They move slightly to the right as the track moves left
    gsap.utils.toArray(".parallax-bg").forEach((bg: unknown) => {
      tl.to(bg as HTMLElement, {
        x: "20%",
        ease: "none"
      }, 0); // Start at the same time as the track animation
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) {
          st.kill();
        }
      });
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative h-screen w-full bg-bg-primary overflow-hidden flex flex-col justify-center">
      
      <div className="absolute top-12 md:top-24 left-6 md:left-12 z-30">
        <h2 className="font-bebas text-5xl md:text-7xl tracking-wide text-text-primary">
          SELECTED <span className="text-accent-orange">WORKS</span>
        </h2>
      </div>

      {/* The Track that slides horizontally */}
      <div ref={trackRef} className="flex gap-8 md:gap-16 px-6 md:px-12 w-fit pt-24">
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
        {/* Spacer at the end of the track to ensure the last card isn't flush with the screen edge */}
        <div className="w-[10vw] flex-shrink-0" />
      </div>

    </section>
  );
}
