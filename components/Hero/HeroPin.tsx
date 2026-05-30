"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useScrollStore } from "@/lib/store";

export default function HeroPin({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const setProgress = useScrollStore((state) => state.setHeroScrollProgress);

  useEffect(() => {
    // Only run animations if the user hasn't requested reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    // Create the master timeline that pins the hero section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=150%", // Pin for 150vh
        pin: true,
        scrub: 1, // Smooth scrubbing
        onUpdate: (self) => {
          // Send progress (0 to 1) to Zustand for Three.js to consume
          setProgress(self.progress);
        }
      }
    });

    // 0 -> 50% scroll: Fade out text
    tl.to(".hero-fade-target", {
      opacity: 0,
      x: -50,
      duration: 0.5,
      ease: "power2.inOut"
    }, 0);

    // (Removed slow HTML width animation to use fast WebGL camera panning instead)

    return () => {
      // Clean up ScrollTrigger on unmount
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === container) {
          st.kill();
        }
      });
      tl.kill();
    };
  }, [setProgress]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {children}
    </section>
  );
}
