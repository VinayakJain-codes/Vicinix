"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Touch devices — hide entirely
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide native cursor on the whole page
    document.documentElement.style.cursor = "none";

    // Raw mouse coords (updated synchronously on every mousemove)
    const mouse = { x: -100, y: -100 };
    // Smoothed ring coords
    const smooth = { x: -100, y: -100 };

    // State flags — plain booleans, no setState
    let isLink = false;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive =
        t.tagName === "A" ||
        t.tagName === "BUTTON" ||
        !!t.closest("a") ||
        !!t.closest("button");

      if (interactive !== isLink) {
        isLink = interactive;
        if (isLink) {
          dot.style.width = "12px";
          dot.style.height = "12px";
          dot.style.backgroundColor = "#f97316";
          dot.style.boxShadow = "0 0 12px rgba(249,115,22,0.6)";
          ring.style.width = "44px";
          ring.style.height = "44px";
          ring.style.borderColor = "#f97316";
          ring.style.backgroundColor = "rgba(249,115,22,0.08)";
          ring.style.opacity = "1";
        } else {
          dot.style.width = "8px";
          dot.style.height = "8px";
          dot.style.backgroundColor = "#ffffff";
          dot.style.boxShadow = "none";
          ring.style.width = "36px";
          ring.style.height = "36px";
          ring.style.borderColor = "rgba(255,255,255,0.25)";
          ring.style.backgroundColor = "transparent";
          ring.style.opacity = "0";
        }
      }
    };

    const onMouseEnter = () => {
      ring.style.opacity = isLink ? "1" : "0.5";
    };

    const onMouseLeave = () => {
      ring.style.opacity = "0";
    };

    // rAF loop — runs at display refresh rate (60/120/144 Hz)
    // Factor: how fast the ring catches the dot (0–1). Higher = snappier.
    const LERP = 0.18;

    const tick = () => {
      // Dot: instant 1:1 tracking
      dot.style.transform = `translate(${mouse.x - 4}px, ${mouse.y - 4}px)`;

      // Ring: smooth lerp
      smooth.x += (mouse.x - smooth.x) * LERP;
      smooth.y += (mouse.y - smooth.y) * LERP;
      ring.style.transform = `translate(${smooth.x - 18}px, ${smooth.y - 18}px)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Dot — instant 1:1 with mouse */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          transform: "translate(-100px, -100px)",
        }}
      />
      {/* Ring — smooth trailing */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.25)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          willChange: "transform",
          transform: "translate(-100px, -100px)",
          transition: "width 0.2s, height 0.2s, border-color 0.2s, background-color 0.2s, opacity 0.15s",
        }}
      />
    </>
  );
}
