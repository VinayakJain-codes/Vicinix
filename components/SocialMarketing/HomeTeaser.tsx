import Link from "next/link";
import { Camera, Megaphone, PartyPopper } from "lucide-react";
import TrackedLink from "./TrackedLink";

export default function HomeTeaser() {
  return <section aria-labelledby="social-teaser-title" id="marketing" className="relative z-10 scroll-mt-24 border-y border-[var(--border-highlight)] bg-[var(--bg-elevated)] px-4 py-20 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl rounded-3xl border border-[var(--border-highlight)] bg-[var(--bg-surface)] p-7 sm:p-12 lg:p-16">
      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[var(--gold-primary)]">Marketing & Events</p>
      <h2 id="social-teaser-title" className="max-w-4xl font-serif text-3xl font-bold leading-tight sm:text-4xl">Build your brand. Reach your audience. Bring people together.</h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">From social content and ad campaigns to branding and event management, we help businesses get seen and create experiences people remember. One team, with a plan built around your goals.</p>
      <ul className="my-8 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-8">{[[Camera, "Content creation"], [Megaphone, "Ad campaigns"], [PartyPopper, "Event management"]].map(([Icon, label]) => {
        const HighlightIcon = Icon as typeof Camera;
        return <li key={String(label)} className="flex items-center gap-3"><HighlightIcon aria-hidden="true" className="h-5 w-5 text-[var(--gold-primary)]" /><span>{String(label)}</span></li>;
      })}</ul>
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
        <TrackedLink href="/social-media#quote" placement="homepage_teaser" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--text-primary)] px-6 py-3 font-semibold text-[var(--bg-base)]">Get a free quote</TrackedLink>
        <Link href="/social-media" className="py-2 font-semibold text-[var(--gold-primary)] underline underline-offset-4">See how it works</Link>
      </div>
    </div>
  </section>;
}
