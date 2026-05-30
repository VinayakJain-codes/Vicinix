"use client";

import Link from "next/link";
import LiveClock from "./LiveClock";

export default function Footer() {
  return (
    <footer id="contact" className="relative min-h-[80vh] w-full bg-bg-primary flex flex-col justify-between pt-32 pb-8 px-6 md:px-12 lg:px-24 border-t border-border-subtle z-20">
      
      {/* Top Half: Massive CTA */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <h2 className="font-bebas text-[15vw] leading-[0.8] tracking-wide text-text-primary text-center whitespace-nowrap overflow-hidden w-full select-none">
          LET&apos;S <span className="text-accent-green">BUILD</span>
        </h2>
        
        <div className="mt-8 md:mt-12">
          <a 
            href="mailto:mail@vicinix.co.in?subject=Project%20Inquiry%20-%20Let's%20Build&body=Hi%20Vicinix%20Team%2C%0D%0A%0D%0AI'm%20interested%20in%20working%20with%20you%20on%20a%20project.%0D%0A%0D%0A[Please%20describe%20your%20project%20or%20idea%20here]%0D%0A%0D%0ABest%2C%0D%0A[Your%20Name]" 
            className="group relative font-syne text-xl md:text-3xl text-text-muted hover:text-white transition-colors duration-300 cursor-none pointer-events-auto inline-block"
          >
            mail@vicinix.co.in
            {/* Hover Underline */}
            <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-accent-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </a>
        </div>
      </div>

      {/* Bottom Half: 4-Column Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pt-24 mt-auto border-t border-border-subtle/50 font-dm text-sm text-text-muted">
        
        {/* Column 1: Brand */}
        <div className="flex flex-col gap-4">
          <span className="font-bebas text-3xl tracking-wide text-white">
            VICINIX<span className="text-accent-orange">.</span>
          </span>
          <p>© {new Date().getFullYear()} Vicinix.<br/>All rights reserved.</p>
        </div>

        {/* Column 2: Navigation */}
        <div className="flex flex-col gap-4">
          <span className="font-syne font-semibold text-white uppercase tracking-wider text-xs mb-2">Navigation</span>
          <Link href="/" className="hover:text-white transition-colors w-fit cursor-none">Home</Link>
          <Link href="#services" className="hover:text-white transition-colors w-fit cursor-none">Services</Link>
          <Link href="#work" className="hover:text-white transition-colors w-fit cursor-none">Work</Link>
        </div>

        {/* Column 3: Socials */}
        <div className="flex flex-col gap-4">
          <span className="font-syne font-semibold text-white uppercase tracking-wider text-xs mb-2">Socials</span>
          <a href="#" className="hover:text-accent-green transition-colors w-fit cursor-none">X (Twitter)</a>
          <a href="#" className="hover:text-accent-green transition-colors w-fit cursor-none">LinkedIn</a>
          <a href="#" className="hover:text-accent-green transition-colors w-fit cursor-none">GitHub</a>
        </div>

        {/* Column 4: Status / Clock */}
        <div className="flex flex-col gap-4 lg:items-end text-left lg:text-right">
          <span className="font-syne font-semibold text-white uppercase tracking-wider text-xs mb-2">Local Time</span>
          <span className="font-mono bg-bg-surface px-3 py-1.5 rounded border border-border-subtle inline-block w-fit">
            <LiveClock />
          </span>
          <span className="flex items-center gap-2 mt-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
            </span>
            Accepting new projects
          </span>
        </div>

      </div>
    </footer>
  );
}
