"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLSpanElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const wordmark = wordmarkRef.current;
    const links = linksRef.current;

    if (!nav || !wordmark || !links) return;

    // Initial entrance animation
    gsap.fromTo(
      nav,
      { y: -64, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 }
    );

    // Scroll animation
    gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=150",
        scrub: false,
        toggleActions: "play none none reverse", // play on scroll down, reverse on scroll up past start
      },
    });

    // We use matchMedia for ScrollTrigger to ensure animations behave well
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      // Create scroll-driven shrink animation
      ScrollTrigger.create({
        start: "top -50",
        end: 99999,
        toggleClass: { className: "scrolled", targets: nav }
      });
      
      const shrinkTl = gsap.timeline({
        scrollTrigger: {
          start: "top -50",
          end: "top -100",
          scrub: 0.5,
        }
      });
      
      shrinkTl.to(nav, { height: "48px", duration: 0.3, ease: "power2.inOut" }, 0)
              .to(wordmark, { scale: 0.85, transformOrigin: "left center", duration: 0.3, ease: "power2.inOut" }, 0)
              .to(links, { opacity: 0.6, duration: 0.3, ease: "power2.inOut" }, 0);
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 backdrop-blur-xl bg-bg-primary/40 border-b border-transparent transition-colors duration-300 [&.scrolled]:border-border-subtle [&.scrolled]:bg-bg-surface/70"
    >
      {/* Left: Wordmark */}
      <Link href="/" className="flex-shrink-0 cursor-none">
        <span ref={wordmarkRef} className="font-bebas text-3xl tracking-wide flex items-center">
          VICINIX<span className="text-accent-orange">.</span>
        </span>
      </Link>

      {/* Right: Links & CTA */}
      <div className="flex items-center gap-8">
        <div ref={linksRef} className="hidden md:flex items-center gap-8 font-syne text-sm font-medium">
          <Link href="#services" className="hover:opacity-100 opacity-80 transition-opacity cursor-none">Services</Link>
          <Link href="#work" className="hover:opacity-100 opacity-80 transition-opacity cursor-none">Work</Link>
          <Link href="#contact" className="hover:opacity-100 opacity-80 transition-opacity cursor-none">Contact</Link>
        </div>
        
        <Link 
          href="#contact" 
          className="group relative px-5 py-2 rounded-full border border-accent-orange font-syne text-sm font-medium overflow-hidden transition-colors cursor-none"
        >
          <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
            <span className="text-accent-orange group-hover:text-black transition-colors">→</span> 
            Let&apos;s Build
          </span>
          <div className="absolute inset-0 bg-accent-orange translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </Link>
      </div>
    </nav>
  );
}
