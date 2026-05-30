"use client";

import Image from "next/image";

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  status: string;
  linkText: string;
  linkUrl?: string;
  tags: string[];
  imageUrl: string;
  accentColor: "orange" | "green";
}

export default function ProjectCard({ title, category, description, status, linkText, linkUrl, tags, imageUrl, accentColor }: ProjectCardProps) {
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
        <div className="flex flex-wrap items-center gap-3 mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className={`font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full border ${accentColor === 'orange' ? 'border-accent-orange text-accent-orange' : 'border-accent-green text-accent-green'}`}>
            {category}
          </span>
          <span className="font-dm text-xs text-text-muted px-2 py-1 bg-bg-surface/50 rounded backdrop-blur-sm">
            {status}
          </span>
        </div>
        
        <h3 className="font-bebas text-5xl md:text-6xl lg:text-7xl tracking-wide text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 mb-4">
          {title}
        </h3>

        <p className="font-dm text-sm md:text-base text-text-primary max-w-xl transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 mb-6">
          {description}
        </p>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="font-dm text-xs text-text-muted px-2 py-1 bg-bg-surface/50 border border-border-subtle rounded backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
          
          <div className={`font-syne text-sm font-bold flex-shrink-0 ${accentColor === 'orange' ? 'text-accent-orange' : 'text-accent-green'}`}>
            {linkUrl ? (
              <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer pointer-events-auto">
                {linkText} <span className="text-lg">↗</span>
              </a>
            ) : (
              <span className="flex items-center gap-2">{linkText}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
