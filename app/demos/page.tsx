import type { Metadata } from "next";
import Link from "next/link";
import { ChefHat, FileText, Shield, CalendarDays, Gift, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import EventScreenshots from "@/components/EventScreenshots";

export const metadata: Metadata = {
  title: "Demos & Websites",
  description: "Explore Vicinix software demos, event management screenshots and websites including Vinayak, Enter Chaos and Marketnera.",
  alternates: { canonical: "/demos" },
  openGraph: { title: "Vicinix Demos & Websites", description: "Explore our software, websites and event management interface.", url: "/demos" },
};

const demos = [
  { name: "Vicinix Menu", icon: ChefHat, status: "Interactive demo", description: "Explore a sample restaurant menu, table ordering and kitchen workflow.", href: "/apps/menu", action: "Try Menu demo" },
  { name: "Vicinix Invoice", icon: FileText, status: "Interactive demo", description: "Try sample invoicing and receivables workflows for your business.", href: "/apps/invoice", action: "Try Invoice demo" },
  { name: "Vicinix Guard", icon: Shield, status: "Demo on request", description: "Arrange a guided demonstration of guard patrols, checkpoints and security workforce management.", href: "/contact?product=vicinix-guard", action: "Request Guard demo" },
  { name: "Vicinix Events", icon: CalendarDays, status: "Live client deployment", description: "See screenshots of event pages, ticket selection and branded QR tickets. A guided demo is available on request.", href: "/products/vicinix-events#event-screenshots", action: "Explore Events software" },
  { name: "Vicinix Loyalty", icon: Gift, status: "Planned · concept preview", description: "Try a sample digital stamp card and reward redemption journey. The production product is planned.", href: "/products/vicinix-loyalty#loyalty-preview", action: "Try Loyalty concept" },
];

const websites = [
  { name: "Vinayak", domain: "vinayak.vicinix.co.in", href: "https://vinayak.vicinix.co.in", description: "Explore Vinayak’s personal website." },
  { name: "Enter Chaos", domain: "enterchaos.vicinix.co.in", href: "https://enterchaos.vicinix.co.in", description: "Explore the Enter Chaos website." },
  { name: "Marketnera", domain: "marketnera.com", href: "https://marketnera.com", description: "Explore the Marketnera website." },
];

export default function DemosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--bg-base)] px-5 pb-20 pt-32 text-[var(--text-primary)] sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--gold-primary)]">Vicinix · Demos &amp; Websites</p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">See what fits your business.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">Visit our websites, try a sample software workflow or explore the Events interface. Each product is labelled so you can tell a demo, live client deployment and planned concept apart.</p>
          <nav aria-label="Demos page sections" className="my-8 flex flex-wrap gap-3">{[["#websites", "Websites"], ["#software-demos", "Software demos"], ["#event-screenshots", "Event screenshots"]].map(([href, label]) => <a key={href} href={href} className="inline-flex min-h-11 items-center rounded-full border border-[var(--border-highlight)] px-5 py-2 font-medium text-[var(--gold-primary)]">{label}</a>)}</nav>

          <section id="websites" aria-labelledby="websites-title" className="scroll-mt-28 border-t border-[var(--border-subtle)] py-12">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--gold-primary)]">Website showcase</p>
            <h2 id="websites-title" className="font-serif text-3xl font-bold sm:text-4xl">Open a website. Explore the experience.</h2>
            <p className="mt-4 text-[var(--text-muted)]">These websites open in a new tab.</p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">{websites.map(site => <article key={site.href} className="flex min-w-0 flex-col overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
              <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] bg-[var(--badge-bg)] px-6 py-5"><Globe aria-hidden="true" className="h-5 w-5 shrink-0 text-[var(--gold-primary)]" /><span className="break-all text-sm text-[var(--text-muted)]">{site.domain}</span></div>
              <div className="flex flex-1 flex-col p-6"><h3 className="font-serif text-2xl font-bold">{site.name}</h3><p className="mb-6 mt-3 leading-relaxed text-[var(--text-muted)]">{site.description}</p><a href={site.href} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--text-primary)] px-5 py-3 font-semibold text-[var(--bg-base)]">Visit {site.name}<span className="sr-only"> (opens in a new tab)</span></a></div>
            </article>)}</div>
          </section>

          <section id="software-demos" aria-labelledby="software-demos-title" className="scroll-mt-28 border-t border-[var(--border-subtle)] py-12">
          <h2 id="software-demos-title" className="font-serif text-3xl font-bold sm:text-4xl">Explore the software.</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-[var(--text-muted)]">Menu and Invoice are browser demos with sample data. Events has a live client deployment with a guided demo on request. Loyalty is a planned product with an interactive concept preview.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {demos.map(({ name, icon: Icon, status, description, href, action }) => (
              <article key={name} className="flex flex-col rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7">
                <Icon aria-hidden="true" className="h-9 w-9 text-[var(--gold-primary)]" />
                <p className="mt-6 text-sm font-semibold text-[var(--gold-primary)]">{status}</p>
                <h3 className="mt-3 font-serif text-2xl">{name}</h3>
                <p className="mb-8 mt-4 leading-relaxed text-[var(--text-muted)]">{description}</p>
                <Link href={href} className="mt-auto inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--text-primary)] px-4 py-3 font-semibold text-[var(--bg-base)]">{action}</Link>
              </article>
            ))}
          </div>
          </section>
          <EventScreenshots />
          <div className="mt-10 rounded-2xl border border-[var(--border-subtle)] p-6">
            <h2 className="font-serif text-2xl">Have a workflow in mind?</h2>
            <p className="mt-3 leading-relaxed text-[var(--text-muted)]">We can discuss a product deployment or custom software for your business.</p>
            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-4 font-semibold">
              <a href="https://wa.me/918923678493" className="underline underline-offset-4">WhatsApp +91 89236 78493</a>
              <a href="mailto:mail@vicinix.co.in" className="underline underline-offset-4">mail@vicinix.co.in</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
