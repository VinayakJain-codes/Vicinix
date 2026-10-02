"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import LiveClock from "./LiveClock";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[var(--bg-base)] border-t border-[var(--border-subtle)] pt-20 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature: Bespoke Software Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-[var(--border-highlight)] bg-gradient-to-br from-[var(--bg-surface)] via-[var(--bg-elevated)] to-[var(--bg-surface)] p-8 md:p-12 mb-20 shadow-xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[var(--gold-primary)]/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-[var(--gold-primary)] bg-[var(--badge-bg)] border border-[var(--border-subtle)] mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Bespoke Software Engineering
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-wide">
                Need proprietary enterprise software engineered?
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                Beyond our off-the-shelf product suite, Vicinix architects mission-critical custom web platforms, automated ERPs, and algorithmic systems tailored to your exact operational requirements.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Link
                href="/enquire"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider rounded-xl bg-[var(--gold-primary)] text-black hover:bg-[var(--gold-hover)] transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                <span>Enquire for Personal Software</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Multi-Column Site Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[var(--border-subtle)]">
          
          {/* Column 1: Brand Essence */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-widest text-[var(--text-primary)]">
                VICINIX
              </span>
              <span className="w-2 h-2 rounded-full bg-[var(--gold-primary)]" />
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-sm">
              Sovereign software engineered for precision. Powering physical security command centers, next-generation finance, and enterprise operational logistics.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[var(--text-muted)]">
              <span className="px-2.5 py-1 rounded border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
                EST. 2025
              </span>
              <span className="flex items-center gap-1.5 text-[var(--gold-primary)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--gold-primary)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--gold-primary)]"></span>
                </span>
                Systems Operational
              </span>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)] font-semibold">
              Solutions
            </h4>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              {Object.values(CATEGORIES).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/solutions/${cat.slug}`}
                    className="hover:text-[var(--text-primary)] transition-colors block py-0.5"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)] font-semibold">
              Products
            </h4>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <Link
                    href={`/products/${prod.slug}`}
                    className="hover:text-[var(--text-primary)] transition-colors flex items-center justify-between py-0.5 group"
                  >
                    <span className="group-hover:text-[var(--text-primary)]">{prod.fullName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company & Communication */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)] font-semibold">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li>
                <Link href="/about" className="hover:text-[var(--text-primary)] transition-colors block py-0.5">
                  About Vicinix
                </Link>
              </li>
              <li>
                <Link href="/enquire" className="hover:text-[var(--text-primary)] transition-colors block py-0.5">
                  Personal Software
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--text-primary)] transition-colors block py-0.5">
                  Contact Support & Sales
                </Link>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/vinayak-jain-1786b9357/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 py-0.5"
                >
                  <span>Founder LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/VinayakJain-codes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 py-0.5"
                >
                  <span>Engineering GitHub</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <div>
            © {currentYear} Vicinix Technologies. All rights reserved. Products tagged &ldquo;[Product] by Vicinix&rdquo;.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono px-2 py-1 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
              <LiveClock />
            </span>
            <span>Crafted by Vinayak Jain</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
