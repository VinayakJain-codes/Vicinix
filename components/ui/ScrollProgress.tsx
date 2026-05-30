"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    // Use GSAP to animate scaleX based on scroll progress without React re-renders
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1, // very tiny scrub for ultra-smoothness
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === document.body) st.kill();
      });
    };
  }, []);

  return (
    <div 
      ref={progressRef}
      className="fixed top-0 left-0 h-[2px] bg-accent-orange z-[100] origin-left"
      style={{ transform: "scaleX(0)", width: "100%" }}
      aria-hidden="true"
    />
  );
}
