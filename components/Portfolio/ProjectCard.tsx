"use client";

import Image from "next/image";

interface ProjectCardProps {
  title: string;
  category: string;
  tags: string[];
  imageUrl: string;
  accentColor: "orange" | "green";
}

export default function ProjectCard({ title, category, tags, imageUrl, accentColor }: ProjectCardProps) {
  return (
    <div className="relative w-[85vw] md:w-[70vw] lg:w-[60vw] h-[60vh] flex-shrink-0 rounded-2xl overflow-hidden border border-border-subtle group cursor-none">
      
      {/* Parallax Image Background Layer */}
      {/* We make the image wider than the container so GSAP has room to pan it horizontally */}
      <div className="absolute top-0 -left-[10%] w-[120%] h-full z-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="parallax-bg object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
          unoptimized // Using unoptimized for external placeholder URLs
        />
      </div>

      {/* Heavy Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
        <div className="flex items-center gap-4 mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className={`font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full border ${accentColor === 'orange' ? 'border-accent-orange text-accent-orange' : 'border-accent-green text-accent-green'}`}>
            {category}
          </span>
          <div className="flex gap-2">
            {tags.map(tag => (
              <span key={tag} className="font-dm text-xs text-text-muted px-2 py-1 bg-bg-surface/50 rounded backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <h3 className="font-bebas text-5xl md:text-6xl lg:text-7xl tracking-wide text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
          {title}
        </h3>
      </div>
    </div>
  );
}
