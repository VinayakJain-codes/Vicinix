"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ArrowRight,
  Shield,
  DollarSign,
  Cpu,
  Clock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";

function ContactForm() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get("product") || "";
  const initialSubject = searchParams.get("subject") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: initialProduct ? `Product: ${initialProduct}` : "General Inquiry",
    subject: initialSubject || "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialSubject && !formData.subject) {
      setFormData((prev) => ({ ...prev, subject: initialSubject }));
    }
  }, [initialSubject, formData.subject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      
      {/* Contact Details & Channels */}
      <div className="lg:col-span-5 space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)]">
            Communication Channels
          </span>
          <h2 className="font-serif text-3xl font-bold text-[var(--text-primary)] mt-1 mb-4">
            Connect with Vicinix
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Whether inquiring about deploying Vicinix Guard, joining our early access developer programs, or exploring enterprise partnerships, we respond directly without automated gatekeepers.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <div className="p-2.5 rounded-xl bg-[var(--badge-bg)] text-[var(--gold-primary)] border border-[var(--border-subtle)]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-[var(--text-muted)] uppercase">Direct Email</div>
              <a
                href="mailto:mail@vicinix.co.in"
                className="text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--gold-primary)] transition-colors"
              >
                mail@vicinix.co.in
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <div className="p-2.5 rounded-xl bg-[var(--badge-bg)] text-[var(--gold-primary)] border border-[var(--border-subtle)]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-[var(--text-muted)] uppercase">Response SLA</div>
              <div className="text-sm font-semibold text-[var(--text-primary)]">
                Within 24 business hours
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <div className="p-2.5 rounded-xl bg-[var(--badge-bg)] text-[var(--gold-primary)] border border-[var(--border-subtle)]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-[var(--text-muted)] uppercase">Headquarters</div>
              <div className="text-sm font-semibold text-[var(--text-primary)]">
                Meerut / NCR, India
              </div>
            </div>
          </div>
        </div>

        {/* Custom Software Route Callout */}
        <div className="p-6 rounded-2xl border border-[var(--border-highlight)] bg-[var(--bg-surface)]">
          <div className="text-xs font-mono uppercase text-[var(--gold-primary)] mb-1">
            Looking for bespoke development?
          </div>
          <p className="text-xs text-[var(--text-muted)] mb-3">
            If you need custom engineering rather than general inquiries or off-the-shelf products, use our dedicated funnel.
          </p>
          <Link
            href="/enquire"
            className="text-xs font-semibold text-[var(--gold-primary)] hover:underline inline-flex items-center gap-1"
          >
            <span>Open Custom Software Request</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main General Form */}
      <div className="lg:col-span-7">
        {submitted ? (
          <div className="rounded-3xl border border-[var(--border-highlight)] bg-[var(--bg-surface)] p-8 sm:p-12 text-center shadow-xl">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)] mb-2">
              Message Dispatched
            </h3>
            <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto mb-6">
              Thank you, <span className="text-[var(--text-primary)] font-semibold">{formData.name}</span>. Your message has been routed to our team. We will reply to <span className="text-[var(--gold-primary)] font-semibold">{formData.email}</span> shortly.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="px-5 py-2.5 rounded-xl border border-[var(--border-subtle)] text-xs font-mono uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-10 shadow-xl space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[var(--text-muted)] mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--gold-primary)] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[var(--text-muted)] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rahul@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--gold-primary)] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] mb-1.5">
                Department / Inquiry Type *
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:border-[var(--gold-primary)] focus:outline-none transition-colors"
              >
                <option value="General Inquiry">General Business Inquiry</option>
                <option value="Product: vicinix-guard">Vicinix Guard (Security Platform)</option>
                <option value="Product: vicinix-events">Vicinix Events (Access Control)</option>
                <option value="Product: vicinix-invoice">Vicinix Invoice (Early Access)</option>
                <option value="Product: vicinix-tax">Vicinix Tax (Beta Waitlist)</option>
                <option value="Product: vicinix-menu">Vicinix Menu (Restaurant Pilot)</option>
                <option value="Product: vicinix-erp">Vicinix ERP (Enterprise Advisory)</option>
                <option value="Partnership">Commercial Partnerships</option>
                <option value="Support">Existing Customer Support</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] mb-1.5">
                Subject *
              </label>
              <input
                type="text"
                required
                placeholder="Brief summary of your inquiry"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--gold-primary)] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--text-muted)] mb-1.5">
                Message *
              </label>
              <textarea
                required
                rows={5}
                placeholder="How can Vicinix help your organization?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--gold-primary)] focus:outline-none transition-colors leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[var(--gold-primary)] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[var(--gold-hover)] transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Dispatching...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>

    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--gold-primary)]">
              Direct Inquiries
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] mt-1 mb-4">
              Contact Us
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              For product deployments, pilot programs, partnerships, or general corporate inquiries.
            </p>
          </div>

          <Suspense fallback={<div className="text-center py-12 text-xs font-mono">Loading form...</div>}>
            <ContactForm />
          </Suspense>

        </div>
      </main>

      <Footer />
    </>
  );
}
