import Link from "next/link";
import type { Metadata } from "next";
import {
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Code2,
  CheckCircle2,
  Cpu,
  Target,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "About Vicinix — Engineering Sovereign Software Systems",
  description:
    "Learn about the mission, engineering philosophy, and long-term ecosystem roadmap behind Vicinix Technologies and founder Vinayak Jain.",
};

export default function AboutPage() {
  const roadmapPhases = [
    {
      phase: "Phase 1",
      title: "Marketing & Product Discovery Site",
      status: "Active / Delivered",
      description:
        "Establishing the multi-product brand architecture, category hubs, live product portals, and dedicated custom software funnel.",
      current: true,
    },
    {
      phase: "Phase 2",
      title: "New Product Buildout: Invoice & Menu",
      status: "In Progress",
      description:
        "Engineering Vicinix Invoice (recurring billing, GST fields, Razorpay links) and Vicinix Menu (table QR scan, kitchen display, table checkout).",
      current: false,
    },
    {
      phase: "Phase 3",
      title: "Central Account System",
      status: "Planned",
      description:
        "Unified Vicinix customer identity and authentication across all security, financial, and logistics products.",
      current: false,
    },
    {
      phase: "Phase 4",
      title: "Unified Billing & Payments Backbone",
      status: "Planned",
      description:
        "Centralized Razorpay engine powering subscriptions, one-time passes, and entitlement checks across the entire ecosystem.",
      current: false,
    },
    {
      phase: "Phase 5",
      title: "Full Product Ecosystem Integration",
      status: "Planned",
      description:
        "Connecting all products into a single operating dashboard with cross-platform analytics and centralized enterprise control.",
      current: false,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)] bg-[var(--badge-bg)] border border-[var(--border-subtle)] mb-6">
              <span>FOUNDED BY VINAYAK JAIN</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[var(--text-primary)] leading-tight mb-6">
              Engineering Sovereign <br />
              <span className="text-gold-gradient font-serif">Software Systems.</span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-normal">
              Vicinix was created to challenge the prevailing status quo of fragmented, bloated SaaS tools. We engineer deeply focused, high-throughput operating systems for businesses that demand absolute operational control.
            </p>
          </div>

          {/* Core Philosophy (3 Pillars) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8">
              <div className="w-12 h-12 rounded-xl bg-[var(--badge-bg)] text-[var(--gold-primary)] border border-[var(--border-subtle)] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] mb-2">
                Honest, Real Engineering
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                We reject feature vaporware and deceptive marketing claims. Every platform released under the Vicinix standard is tested in real-world environments before public deployment.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8">
              <div className="w-12 h-12 rounded-xl bg-[var(--badge-bg)] text-[var(--gold-primary)] border border-[var(--border-subtle)] flex items-center justify-center mb-6">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] mb-2">
                Cryptographic Auditability
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                From guard checkpoint geotags to turnstile QR passes and GST invoice ledgers, our systems are built around unalterable audit trails and deterministic verification.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8">
              <div className="w-12 h-12 rounded-xl bg-[var(--badge-bg)] text-[var(--gold-primary)] border border-[var(--border-subtle)] flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] mb-2">
                Sovereign Modularity
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                We believe organizations should own their data pipelines without being trapped in predatory vendor lock-ins. Every Vicinix system provides clean data exports and standard APIs.
              </p>
            </div>
          </div>

          {/* The 5-Phase Master Plan */}
          <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 md:p-14 mb-24 shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)]">
                Strategic Horizon
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mt-1">
                The 5-Phase Ecosystem Roadmap
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2">
                Our systematic build plan toward a cohesive, single-login enterprise operating environment.
              </p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {roadmapPhases.map((phase, idx) => (
                <div
                  key={phase.phase}
                  className={`p-6 rounded-2xl border transition-all ${
                    phase.current
                      ? "border-[var(--gold-primary)] bg-[var(--bg-elevated)] shadow-lg"
                      : "border-[var(--border-subtle)] bg-[var(--bg-surface)]"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-[var(--gold-primary)]">
                        {phase.phase}
                      </span>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                        {phase.title}
                      </h3>
                    </div>
                    <span
                      className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full w-fit ${
                        phase.current
                          ? "border border-[var(--border-highlight)] text-[var(--gold-primary)] bg-[var(--badge-bg)]"
                          : "border border-[var(--border-subtle)] text-[var(--text-muted)] bg-[var(--bg-elevated)]"
                      }`}
                    >
                      {phase.status}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bespoke Software Commission Callout */}
          <div className="rounded-3xl border border-[var(--border-highlight)] bg-[var(--bg-surface)] p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)]">
              Partner With Us
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mt-2 mb-4">
              Have an ambitious software project?
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-8 max-w-lg mx-auto leading-relaxed">
              We collaborate with select enterprises and founders to engineer mission-critical proprietary applications.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/enquire"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--gold-primary)] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all shadow-md"
              >
                <span>Enquire for Personal Software</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] font-semibold text-xs uppercase tracking-wider hover:border-[var(--gold-primary)] transition-all"
              >
                <span>General Contact</span>
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
