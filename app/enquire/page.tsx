"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  Send,
  Calendar,
  Lock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";

export default function EnquirePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    projectType: "SaaS Platform",
    budgetRange: "₹2.5L – ₹6L ($3,000 – $7,500)",
    timeline: "1–3 months",
    scopeDescription: "",
    specDocLink: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectTypes = [
    "SaaS Platform",
    "Internal Operations Tool",
    "Mobile Application",
    "Custom ERP & Logistics",
    "AI & Computer Vision",
    "High-Performance Web App",
  ];

  const budgetTiers = [
    "₹1L – ₹2.5L ($1,500 – $3,000)",
    "₹2.5L – ₹6L ($3,000 – $7,500)",
    "₹6L+ ($7,500+)",
    "Flexible / Custom Enterprise",
  ];

  const timelines = [
    "Urgent (< 1 month)",
    "1–3 months",
    "3–6 months",
    "Flexible discovery phase",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate robust client-side dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)] bg-[var(--badge-bg)] border border-[var(--border-subtle)] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Engineering Commission</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-4">
              Enquire for Personal Software
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              Have a proprietary platform or specialized software to build? We design and engineer end-to-end custom web applications, SaaS backbones, and operations platforms from scratch.
            </p>
          </div>

          {submitted ? (
            /* Success State */
            <div className="rounded-3xl border border-[var(--border-highlight)] bg-[var(--bg-surface)] p-8 sm:p-12 text-center shadow-2xl animate-in zoom-in-95 duration-400">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2">
                Engineering Specification Received
              </h2>
              <p className="text-sm text-[var(--text-muted)] max-w-lg mx-auto mb-8 leading-relaxed">
                Thank you, <span className="font-semibold text-[var(--text-primary)]">{formData.fullName}</span>. Our engineering team reviews project scopes within 24 hours. We will send an initial feasibility analysis and architecture assessment to <span className="font-semibold text-[var(--gold-primary)]">{formData.email}</span>.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl border border-[var(--border-subtle)] text-xs font-mono uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--gold-primary)] transition-all cursor-pointer"
                >
                  Submit Another Project
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--gold-primary)] text-black text-xs font-semibold uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all"
                >
                  <span>Return to Ecosystem</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            /* Request Form */
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-10 shadow-2xl space-y-8"
            >
              {/* Section 1: Contact Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-subtle)]">
                  <span className="text-xs font-mono text-[var(--gold-primary)] font-bold">01.</span>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-primary)] font-semibold">
                    Contact & Organization
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[var(--text-muted)] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vinayak Jain"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--gold-primary)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--text-muted)] mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. founder@enterprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--gold-primary)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--text-muted)] mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Logistics Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--gold-primary)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--text-muted)] mb-1.5">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--gold-primary)] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Project Classification */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-subtle)]">
                  <span className="text-xs font-mono text-[var(--gold-primary)] font-bold">02.</span>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-primary)] font-semibold">
                    Project Classification
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--text-muted)] mb-2">
                    Primary Software Type *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {projectTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, projectType: type })}
                        className={`p-3 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer ${
                          formData.projectType === type
                            ? "border-[var(--gold-primary)] bg-[var(--badge-bg)] text-[var(--gold-primary)] shadow-sm"
                            : "border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-mono text-[var(--text-muted)] mb-1.5">
                      Budget Range *
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:border-[var(--gold-primary)] focus:outline-none transition-colors"
                    >
                      {budgetTiers.map((tier) => (
                        <option key={tier} value={tier}>
                          {tier}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--text-muted)] mb-1.5">
                      Target Timeline *
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:border-[var(--gold-primary)] focus:outline-none transition-colors"
                    >
                      {timelines.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Scope & Specifications */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-subtle)]">
                  <span className="text-xs font-mono text-[var(--gold-primary)] font-bold">03.</span>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-primary)] font-semibold">
                    Scope & Technical Requirements
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--text-muted)] mb-1.5">
                    Describe your software vision & core features *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you want to build, who your users are, key integrations needed (e.g. Razorpay, WhatsApp, GPS), and any non-negotiable architectural requirements..."
                    value={formData.scopeDescription}
                    onChange={(e) => setFormData({ ...formData, scopeDescription: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--gold-primary)] focus:outline-none transition-colors leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--text-muted)] mb-1.5">
                    Figma / PRD / Spec Document Link (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/... or https://figma.com/..."
                    value={formData.specDocLink}
                    onChange={(e) => setFormData({ ...formData, specDocLink: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--gold-primary)] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Security & Guarantee Note */}
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] pt-2">
                <Lock className="w-3.5 h-3.5 text-[var(--gold-primary)]" />
                <span>All project scopes and intellectual concepts protected by mutual NDA.</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[var(--gold-primary)] text-black font-semibold text-sm uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all shadow-lg hover:shadow-xl cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Evaluating Scope...</span>
                ) : (
                  <>
                    <span>Submit Project for Engineering Review</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
