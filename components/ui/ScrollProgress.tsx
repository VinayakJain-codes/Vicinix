"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight > 0) {
        setProgress((scrollY / docHeight) * 100);
      } else {
        setProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-[2px] bg-accent-orange z-[100] origin-left transition-transform duration-100 ease-out"
      style={{ transform: `scaleX(${progress / 100})`, width: "100%" }}
      aria-hidden="true"
    />
  );
}
