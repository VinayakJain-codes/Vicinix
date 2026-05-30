"use client";

import { useEffect, useRef } from "react";
import { Code, PenTool, Layers, LayoutTemplate, Gauge, ShoppingCart } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const SERVICES = [
  {
    title: "Web Development",
    description: "High-performance, scalable websites built with modern frameworks like Next.js and React.",
    Icon: Code,
    accentColor: "orange" as const,
  },
  {
    title: "UI/UX Design",
    description: "Intuitive, user-centric interfaces that engage users and drive conversions.",
    Icon: PenTool,
    accentColor: "green" as const,
  },
  {
    title: "Full-Stack Products",
    description: "End-to-end application development from robust backends to pixel-perfect frontends.",
    Icon: Layers,
    accentColor: "orange" as const,
  },
  {
    title: "Landing Pages",
    description: "High-converting, beautifully animated promotional pages tailored for your campaigns.",
    Icon: LayoutTemplate,
    accentColor: "green" as const,
  },
  {
    title: "SaaS Dashboards",
    description: "Complex data visualization and management platforms engineered for clarity and speed.",
    Icon: Gauge,
    accentColor: "orange" as const,
  },
  {
    title: "E-commerce",
    description: "Seamless shopping experiences optimized for modern buyers and high transaction volumes.",
    Icon: ShoppingCart,
    accentColor: "green" as const,
  }
];

export default function ServicesGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Staggered entry animation for the cards
    gsap.fromTo(
      ".service-card-reveal",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 80%", // trigger when grid is 80% down the viewport
          toggleActions: "play none none none"
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === grid) st.kill();
      });
    };
  }, []);

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {SERVICES.map((service, idx) => (
        <ServiceCard key={idx} {...service} />
      ))}
    </div>
  );
}
