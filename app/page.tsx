"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  DollarSign,
  Cpu,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Layers,
  ChevronRight,
  QrCode,
  CreditCard,
  ChefHat,
  MonitorCheck,
  Zap,
  Megaphone,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import ChooseGoal from "@/components/ChooseGoal";
import CaseStudies from "@/components/CaseStudies";
import ProductStatusBadge from "@/components/ProductStatusBadge";
import HomeTeaser from "@/components/SocialMarketing/HomeTeaser";

export default function HomePage() {
  const [activeFlagshipTab, setActiveFlagshipTab] = useState<"guard" | "events">("guard");

  const guardProduct = PRODUCTS.find((p) => p.id === "vicinix-guard")!;
  const eventsProduct = PRODUCTS.find((p) => p.id === "vicinix-events")!;
  const invoiceProduct = PRODUCTS.find((p) => p.id === "vicinix-invoice")!;
  const menuProduct = PRODUCTS.find((p) => p.id === "vicinix-menu")!;

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-500 apple-ease pt-24 overflow-hidden">
        
        {/* Apple-grade Liquid Ambient Blur Orbs */}
        <div className="liquid-orb top-20 left-1/3 w-[600px] h-[400px] bg-[var(--gold-primary)]/15" />
        <div className="liquid-orb top-1/2 -right-20 w-[500px] h-[500px] bg-amber-500/10" />
        <div className="liquid-orb bottom-40 -left-20 w-[550px] h-[450px] bg-[var(--gold-primary)]/10" />

        {/* =========================================================================
            HERO SECTION (Apple-Style Editorial Precision)
            ========================================================================= */}
        <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-subtle)]">
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            
            {/* Editorial Brand Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)] liquid-glass-pill mb-8 animate-in fade-in duration-700">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)] animate-pulse" />
              <span>THE VICINIX ECOSYSTEM</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.08] mb-6">
              Build your business.{" "}<br className="hidden sm:inline" />
              <span className="text-gold-gradient font-serif">Grow your presence.</span>
            </h1>

            {/* Sub-headline */}
            <p className="max-w-3xl mx-auto text-base sm:text-xl text-[var(--text-muted)] leading-relaxed mb-10 font-normal">
              Software that powers your operations. Marketing that gets you seen.
              From business platforms and custom websites to social media, brand campaigns and event management — built around your next step.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#software"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--gold-primary)] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all duration-300 apple-ease shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                <span>Explore Software</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/social-media"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl liquid-glass text-[var(--text-primary)] font-semibold text-xs uppercase tracking-wider hover:border-[var(--gold-primary)] transition-all duration-300 apple-ease"
              >
                <Sparkles className="w-4 h-4 text-[var(--gold-primary)]" />
                <span>Marketing &amp; Events</span>
              </Link>
            </div>

            {/* Architecture Metrics Strip */}
            <div className="mt-16 pt-8 border-t border-[var(--border-subtle)] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[var(--gold-primary)]">3</div>
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mt-1">Industry Verticals</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[var(--gold-primary)]">{PRODUCTS.length}</div>
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mt-1">Products & Concepts</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[var(--gold-primary)]">{PRODUCTS.filter(product => product.status === "demo").length}</div>
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mt-1">Demo Products</div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[var(--gold-primary)]">{PRODUCTS.filter(product => product.status === "planned").length}</div>
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mt-1">Planned Products</div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            CATEGORIES OVERVIEW (Liquid Glass 3 Pillars)
            ========================================================================= */}
        <ChooseGoal />

        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-labelledby="playground-title">
          <div className="flex flex-col gap-6 rounded-3xl border border-[var(--border-highlight)] bg-[var(--badge-bg)] p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 id="playground-title" className="font-serif text-3xl font-bold">Build a miniature business.</h2>
              <p className="mt-4 leading-relaxed text-[var(--text-muted)]">Explore the full Vicinix software suite in the Business Playground. Connect tools for your café, event, campus or business and try their sample workflows.</p>
            </div>
            <Link href="/playground" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[var(--text-primary)] px-6 py-3 font-semibold text-[var(--bg-base)]">Open the playground</Link>
          </div>
        </section>

        <section id="software" className="scroll-mt-24 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--gold-primary)]">Software &amp; Technology</p>
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">The systems behind your business.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">Explore our software suite and custom development services across security, finance and business operations.</p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]"><strong>Live client deployment:</strong> used in a client engagement. <strong>Demo:</strong> sample workflows or a demonstration on request. <strong>Planned:</strong> proposed scope, with availability to be confirmed.</p>
          </div>
        </section>
        <section id="categories" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)] mb-3">
              Brand Architecture
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
              Three Verticals. Unified Standards.
            </h3>
            <p className="mt-4 text-sm sm:text-base text-[var(--text-muted)]">
              Every system is engineered from first principles under the Vicinix standard of cryptographic auditability, high speed, and zero bloat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Category 1: Security */}
            <div className="rounded-3xl liquid-glass p-8 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[var(--badge-bg)] border border-[var(--border-subtle)] text-[var(--gold-primary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 apple-ease">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--gold-primary)]">
                  Category 01
                </span>
                <h4 className="font-serif text-2xl font-bold text-[var(--text-primary)] mt-1 mb-3">
                  {CATEGORIES.security.name}
                </h4>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  {CATEGORIES.security.description}
                </p>

                <div className="space-y-2 mb-8">
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                    Featured Systems:
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                    <span className="text-sm font-medium text-[var(--text-primary)]">Vicinix Guard</span>
                    <ProductStatusBadge product={guardProduct} />
                  </div>
                </div>
              </div>

              <Link
                href="/solutions/security"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--gold-primary)] group-hover:translate-x-1.5 transition-transform duration-300 apple-ease"
              >
                <span>Explore Security Vertical</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Category 2: Finance */}
            <div className="rounded-3xl liquid-glass p-8 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[var(--badge-bg)] border border-[var(--border-subtle)] text-[var(--gold-primary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 apple-ease">
                  <DollarSign className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--gold-primary)]">
                  Category 02
                </span>
                <h4 className="font-serif text-2xl font-bold text-[var(--text-primary)] mt-1 mb-3">
                  {CATEGORIES.finance.name}
                </h4>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  {CATEGORIES.finance.description}
                </p>

                <div className="space-y-2 mb-8">
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                    Featured Systems:
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                    <span className="text-sm font-medium text-[var(--text-primary)]">Vicinix Invoice</span>
                    <ProductStatusBadge product={invoiceProduct} />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                    <span className="text-sm font-medium text-[var(--text-primary)]">Vicinix Tax</span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-amber-500/30 text-amber-400 bg-amber-500/10">
                      In development
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/solutions/finance"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--gold-primary)] group-hover:translate-x-1.5 transition-transform duration-300 apple-ease"
              >
                <span>Explore Finance Vertical</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Category 3: IT Solutions */}
            <div className="rounded-3xl liquid-glass p-8 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[var(--badge-bg)] border border-[var(--border-subtle)] text-[var(--gold-primary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 apple-ease">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--gold-primary)]">
                  Category 03
                </span>
                <h4 className="font-serif text-2xl font-bold text-[var(--text-primary)] mt-1 mb-3">
                  {CATEGORIES["it-solutions"].name}
                </h4>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  {CATEGORIES["it-solutions"].description}
                </p>

                <div className="space-y-2 mb-8">
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                    Featured Systems:
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                    <span className="text-sm font-medium text-[var(--text-primary)]">Vicinix Events</span>
                    <ProductStatusBadge product={eventsProduct} />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                    <span className="text-sm font-medium text-[var(--text-primary)]">Vicinix Menu</span>
                    <ProductStatusBadge product={menuProduct} />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                    <span className="text-sm font-medium text-[var(--text-primary)]">Vicinix ERP Suite</span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-neutral-500/30 text-neutral-400 bg-neutral-500/10">
                      Planned
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/solutions/it-solutions"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--gold-primary)] group-hover:translate-x-1.5 transition-transform duration-300 apple-ease"
              >
                <span>Explore IT Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </section>

        {/* =========================================================================
            FLAGSHIP SHOWCASE (Liquid Glass Elevated Card)
            ========================================================================= */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-subtle)] relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)]">
                Product showcase
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mt-2 tracking-tight">
                Explore the software and its availability.
              </h3>
            </div>

            {/* Toggle Tabs */}
            <div className="mt-6 md:mt-0 flex items-center p-1.5 rounded-2xl liquid-glass">
              <button
                type="button"
                onClick={() => setActiveFlagshipTab("guard")}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 apple-ease cursor-pointer ${
                  activeFlagshipTab === "guard"
                    ? "bg-[var(--gold-primary)] text-black font-bold shadow-md"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                Vicinix Guard
              </button>
              <button
                type="button"
                onClick={() => setActiveFlagshipTab("events")}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 apple-ease cursor-pointer ${
                  activeFlagshipTab === "events"
                    ? "bg-[var(--gold-primary)] text-black font-bold shadow-md"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                Vicinix Events
              </button>
            </div>
          </div>

          {/* Tab 1: Vicinix Guard Showcase */}
          {activeFlagshipTab === "guard" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl liquid-glass-elevated p-8 sm:p-12 shadow-2xl animate-in fade-in duration-500">
              <div className="lg:col-span-5 space-y-6">
                <ProductStatusBadge product={guardProduct} />
                <h4 className="font-serif text-3xl font-bold text-[var(--text-primary)]">
                  Vicinix Guard
                </h4>
                <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                  {guardProduct.summary}
                </p>
                
                <ul className="space-y-3">
                  {guardProduct.features.slice(0, 3).map((f) => (
                    <li key={f.title} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[var(--gold-primary)] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[var(--text-primary)]">{f.title}: </span>
                        <span className="text-[var(--text-muted)]">{f.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 flex items-center gap-4">
                  <Link
                    href={`/products/${guardProduct.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--gold-primary)] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all duration-300 apple-ease shadow-md hover:scale-[1.02]"
                  >
                    <span>View Product Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/contact?product=vicinix-guard"
                    className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--gold-primary)] transition-colors"
                  >
                    Request Demo →
                  </Link>
                </div>
              </div>

              {/* Guard UI Simulation Frame (Liquid Glass) */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl liquid-glass p-6 shadow-xl space-y-5">
                  <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-green-500/60" />
                      <span className="ml-2 text-xs font-mono text-[var(--text-muted)]">
                        Sample product screen
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Illustrative patrol interface
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                      <div className="text-xl font-bold font-serif text-[var(--gold-primary)]">24</div>
                      <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Active Guards</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                      <div className="text-xl font-bold font-serif text-emerald-400">99.4%</div>
                      <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Checkpoints Cleared</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] col-span-2 sm:col-span-1">
                      <div className="text-xl font-bold font-serif text-[var(--text-primary)]">0</div>
                      <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Active Breaches</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-2">
                    <div className="text-xs font-mono text-[var(--text-muted)] flex items-center justify-between">
                      <span>RECENT PATROL TELEMETRY</span>
                      <span>SAMPLE DATA</span>
                    </div>
                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between text-emerald-400 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <span>Checkpoint #12 (Server Room Perimeter)</span>
                        <span className="text-[10px]">VERIFIED (NFC)</span>
                      </div>
                      <div className="flex items-center justify-between text-[var(--text-muted)] p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                        <span>Checkpoint #13 (Loading Bay South)</span>
                        <span className="text-[10px]">PATROL IN ROUTE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Vicinix Events Showcase */}
          {activeFlagshipTab === "events" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl liquid-glass-elevated p-8 sm:p-12 shadow-2xl animate-in fade-in duration-500">
              <div className="lg:col-span-5 space-y-6">
                <ProductStatusBadge product={eventsProduct} />
                <h4 className="font-serif text-3xl font-bold text-[var(--text-primary)]">
                  Vicinix Events
                </h4>
                <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                  {eventsProduct.summary}
                </p>

                <ul className="space-y-3">
                  {eventsProduct.features.slice(0, 3).map((f) => (
                    <li key={f.title} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[var(--gold-primary)] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-[var(--text-primary)]">{f.title}: </span>
                        <span className="text-[var(--text-muted)]">{f.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 flex items-center gap-4">
                  <Link
                    href={`/products/${eventsProduct.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--gold-primary)] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all duration-300 apple-ease shadow-md hover:scale-[1.02]"
                  >
                    <span>View Product Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/contact?product=vicinix-events"
                    className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--gold-primary)] transition-colors"
                  >
                    Commission Deployment →
                  </Link>
                </div>
              </div>

              {/* Events UI Simulation Frame */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl liquid-glass p-6 shadow-xl space-y-5">
                  <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-green-500/60" />
                      <span className="ml-2 text-xs font-mono text-[var(--text-muted)]">
                        Sample event screen
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Illustrative event interface
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                      <div className="text-xl font-bold font-serif text-[var(--gold-primary)]">3,480</div>
                      <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Checked In</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                      <div className="text-xl font-bold font-serif text-emerald-400">220ms</div>
                      <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Avg Validation</div>
                    </div>
                    <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] col-span-2 sm:col-span-1">
                      <div className="text-xl font-bold font-serif text-red-400">12</div>
                      <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Passbacks Blocked</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-2">
                    <div className="text-xs font-mono text-[var(--text-muted)] flex items-center justify-between">
                      <span>GATE OPTICAL ENGINE</span>
                      <span>AES-256 ROTATING TOKEN</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <QrCode className="w-6 h-6 text-[var(--gold-primary)]" />
                        <div>
                          <div className="text-xs font-semibold text-[var(--text-primary)]">Gate 3 — North VIP Entry</div>
                          <div className="text-[10px] font-mono text-[var(--text-muted)]">Attendee #0492 · Pass Verified</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">ALLOWED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </section>

        {/* =========================================================================
            DELIVERED NEW PRODUCTS (VICINIX INVOICE & VICINIX MENU APPS)
            ========================================================================= */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-subtle)] relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)]">
              Interactive demos
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mt-2 tracking-tight">
              Try the product experience.
            </h3>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-muted)]">
              Explore sample invoicing and restaurant workflows. These browser demos do not represent a live client deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* New Product 1: Vicinix Invoice */}
            <div className="rounded-3xl liquid-glass p-8 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-[var(--badge-bg)] text-[var(--gold-primary)] border border-[var(--border-subtle)] group-hover:scale-110 transition-transform duration-300 apple-ease">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <ProductStatusBadge product={invoiceProduct} />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[var(--text-primary)] mb-2">
                  Vicinix Invoice
                </h4>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--gold-primary)] mb-4">
                  Full Invoicing System & Razorpay Backbone
                </p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  {invoiceProduct.summary}
                </p>
                <ul className="space-y-2.5 text-xs text-[var(--text-muted)] mb-8">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)]" />
                    <span>Embedded Razorpay &apos;Pay Now&apos; Links on every invoice</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)]" />
                    <span>Automatic GST and Statutory Tax calculation fields</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)]" />
                    <span>Automated recurring subscription retainer dispatch</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)]" />
                    <span>Future unified payment core for all Vicinix products</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                <Link
                  href="/apps/invoice"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--gold-primary)] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all duration-300 apple-ease shadow-md hover:scale-[1.02]"
                >
                  <span>Try Invoice Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/products/${invoiceProduct.slug}`}
                  className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  View Editions →
                </Link>
              </div>
            </div>

            {/* New Product 2: Vicinix Menu */}
            <div className="rounded-3xl liquid-glass p-8 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-[var(--badge-bg)] text-[var(--gold-primary)] border border-[var(--border-subtle)] group-hover:scale-110 transition-transform duration-300 apple-ease">
                    <ChefHat className="w-6 h-6" />
                  </div>
                  <ProductStatusBadge product={menuProduct} />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[var(--text-primary)] mb-2">
                  Vicinix Menu
                </h4>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--gold-primary)] mb-4">
                  Restaurant QR Menu + Order Management
                </p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  {menuProduct.summary}
                </p>
                <ul className="space-y-2.5 text-xs text-[var(--text-muted)] mb-8">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)]" />
                    <span>Dynamic Table QR scan opens rich app-free digital menu</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)]" />
                    <span>Direct table-to-kitchen order firing with prep timers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)]" />
                    <span>Live status tracking: Placed → Preparing → Served</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold-primary)]" />
                    <span>Seamless table checkout via Razorpay integration</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                <Link
                  href="/apps/menu"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--gold-primary)] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all duration-300 apple-ease shadow-md hover:scale-[1.02]"
                >
                  <span>Try Menu Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/products/${menuProduct.slug}`}
                  className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  View Editions →
                </Link>
              </div>
            </div>

          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8" aria-labelledby="loyalty-title">
          <div className="rounded-3xl border border-[var(--border-highlight)] bg-[var(--badge-bg)] p-7 sm:p-12">
            <ProductStatusBadge product={PRODUCTS.find(product => product.id === "vicinix-loyalty")!} />
            <h2 id="loyalty-title" className="mt-5 font-serif text-3xl font-bold sm:text-4xl">Give customers a reason to come back.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">Vicinix Loyalty: digital stamp cards, rewards and customer offers for cafes, restaurants and local businesses. Explore the concept while we plan the product.</p>
            <Link href="/products/vicinix-loyalty" className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-[var(--text-primary)] px-6 py-3 font-semibold text-[var(--bg-base)]">Explore Loyalty concept</Link>
          </div>
        </section>
        <CaseStudies />
        <HomeTeaser />

      </main>

      <Footer />
    </>
  );
}
