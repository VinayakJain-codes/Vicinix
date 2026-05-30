"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We only want to run this on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;
    
    if (!cursorDot || !cursorRing) return;

    // Set initial position
    gsap.set([cursorDot, cursorRing], { xPercent: -50, yPercent: -50 });

    const mouse = { x: 0, y: 0 };
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Update dot instantly
      gsap.set(cursorDot, { x: mouse.x, y: mouse.y });
    };

    // Use GSAP ticker to smoothly follow the mouse with the ring
    const ticker = gsap.ticker.add(() => {
      // Lerp for smooth trailing effect
      const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio());
      
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      
      gsap.set(cursorRing, { x: pos.x, y: pos.y });
    });

    // Handle interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for links, buttons
      if (
        target.tagName.toLowerCase() === "a" || 
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") || 
        target.closest("button")
      ) {
        gsap.to(cursorRingRef.current, { scale: 1, opacity: 1, borderColor: "var(--accent-orange)", backgroundColor: "rgba(249, 115, 22, 0.1)", duration: 0.3 });
        gsap.to(cursorDotRef.current, { width: 8, height: 8, y: 0, backgroundColor: "var(--accent-orange)", boxShadow: "0 0 10px rgba(249, 115, 22, 0.5)", duration: 0.2 });
      } 
      // Check for text elements
      else if (
        target.tagName.toLowerCase() === "p" || 
        target.tagName.toLowerCase() === "h1" ||
        target.tagName.toLowerCase() === "h2" ||
        target.tagName.toLowerCase() === "h3" ||
        target.tagName.toLowerCase() === "span" ||
        window.getSelection()?.toString().length
      ) {
        gsap.to(cursorRingRef.current, { scale: 0, opacity: 0, duration: 0.3 });
        gsap.to(cursorDotRef.current, { width: 2, height: 24, y: -12, backgroundColor: "#ffffff", boxShadow: "none", duration: 0.2 });
      }
    };

    const handleMouseOut = () => {
      gsap.to(cursorRingRef.current, { scale: 0.5, opacity: 0, borderColor: "var(--border-subtle)", backgroundColor: "transparent", duration: 0.3 });
      gsap.to(cursorDotRef.current, { width: 8, height: 8, y: 0, backgroundColor: "#ffffff", boxShadow: "none", duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseout", handleMouseOut);
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div 
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-10 h-10 border border-border-subtle rounded-full pointer-events-none z-[100] scale-50 opacity-0"
        aria-hidden="true"
      />
      {/* Inner Dot */}
      <div 
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] origin-center"
        aria-hidden="true"
      />
    </>
  );
}
