"use client";

import { LucideIcon, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  accentColor: "orange" | "green";
}

export default function ServiceCard({ title, description, Icon, accentColor }: ServiceCardProps) {
  const isOrange = accentColor === "orange";
  
  return (
    <div className="service-card-reveal group relative flex flex-col p-8 md:p-10 border border-border-subtle rounded-2xl bg-bg-surface/30 backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-[#141414] hover:border-transparent cursor-none">
      
      {/* Accent Bar on the Left */}
      <div 
        className={`absolute top-0 left-0 h-full w-[3px] transition-all duration-500
          ${isOrange ? 'bg-accent-orange' : 'bg-accent-green'}
          opacity-50 group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(var(--color-shadow),0.5)]
        `}
        style={{
          boxShadow: `0 0 0px ${isOrange ? '#f97316' : '#22c55e'}`,
        }}
      />
      
      {/* Hover glow effect for the bar injected via inline style to use arbitrary shadow colors properly */}
      <style jsx>{`
        .group:hover div[class*="absolute top-0 left-0"] {
          box-shadow: 0 0 20px ${isOrange ? 'rgba(249, 115, 22, 0.6)' : 'rgba(34, 197, 94, 0.6)'} !important;
        }
      `}</style>

      <div className="flex flex-col h-full z-10">
        <div className={`mb-6 p-4 rounded-xl inline-flex self-start bg-[#1a1a1a] border border-border-subtle transition-colors duration-500 group-hover:border-transparent ${isOrange ? 'group-hover:bg-orange-950/30' : 'group-hover:bg-green-950/30'}`}>
          <Icon 
            size={32} 
            className={`transition-colors duration-500 ${isOrange ? 'text-accent-orange' : 'text-accent-green'}`} 
          />
        </div>
        
        <h3 className="font-syne text-2xl font-bold mb-4 text-text-primary">
          {title}
        </h3>
        
        <p className="font-dm text-text-muted leading-relaxed mb-8 flex-grow">
          {description}
        </p>
        
        {/* Animated Arrow */}
        <div className="mt-auto flex items-center self-end overflow-hidden">
          <a href="#work" className="font-syne font-semibold text-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 flex items-center gap-2 cursor-none pointer-events-auto hover:text-white">
            Explore <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
