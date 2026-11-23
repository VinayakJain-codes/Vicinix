import type { Metadata } from "next";
import Link from "next/link";
import { Camera, Sparkles, PartyPopper, Layers, CalendarDays, Megaphone, ChartNoAxesCombined, Check } from "lucide-react";
import CaseStudies from "@/components/CaseStudies";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import { FAQ, ProofCard, ServiceCard } from "@/components/SocialMarketing/Cards";
import QuoteForm from "@/components/SocialMarketing/QuoteForm";
import TrackedLink from "@/components/SocialMarketing/TrackedLink";
import { SOCIAL_FAQS, SOCIAL_SERVICES, SOCIAL_WHATSAPP_URL } from "@/lib/social-marketing";

const title = "Marketing, Social Media & Event Management in Meerut";
const description = "Social media, advertising, branding and event management for businesses in Meerut and beyond. Get a tailored quote from Vicinix.";

export const metadata: Metadata = {
  title, description,
  keywords: ["digital marketing Meerut", "event management Meerut", "social media management", "branding and advertising", "restaurant marketing Meerut", "Vicinix marketing"],
  alternates: { canonical: "/social-media" },
  openGraph: { title, description, url: "/social-media", type: "website", images: [{ url: "/social-media/opengraph-image", width: 1200, height: 630, alt: "Vicinix marketing, branding and event management" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/social-media/opengraph-image"] },
};

const sectionClass = "mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24";
const headingClass = "font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl";
const eyebrowClass = "mb-4 text-sm font-medium uppercase tracking-widest text-[var(--gold-primary)]";
const primaryClass = "inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--text-primary)] px-6 py-3 font-semibold text-[var(--bg-base)] transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-primary)]";

export default function SocialMediaPage() {
  return <>
    <Navbar />
    <main className="overflow-x-clip bg-[var(--bg-base)] pt-28 text-[var(--text-primary)]">
      <section className={`${sectionClass} grid grid-cols-1 items-center gap-12 pt-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pt-16`} aria-labelledby="social-title">
        <div>
          <p className={eyebrowClass}>Vicinix · Marketing & Events</p>
          <h1 id="social-title" className="font-serif text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">Make your brand <span className="text-[var(--gold-primary)]">the next thing people talk about.</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-muted)]">Social media, advertising, branding and event management for businesses, brands and organisers. From everyday visibility to your next big launch, we help you reach the right people.</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <TrackedLink href="#quote" placement="social_hero" className={primaryClass}>Get a quote</TrackedLink>
            <a href="#services" className="inline-flex min-h-12 items-center justify-center px-3 font-medium text-[var(--gold-primary)] underline underline-offset-4">Explore the services</a>
          </div>
          <p className="mt-5 text-sm text-[var(--text-muted)]">A plan for your business. A clear scope. A tailored quote.</p>
        </div>
        <div className="liquid-glass relative min-w-0 rounded-[2rem] p-6 sm:p-9">
          <div className="mb-6 flex items-center justify-between border-b border-[var(--border-subtle)] pb-5"><span className="font-serif text-base font-bold tracking-widest sm:text-lg">YOUR NEXT CHAPTER</span><Sparkles aria-hidden="true" className="h-6 w-6 text-[var(--gold-primary)]" /></div>
          <div className="flex min-h-44 flex-col items-start gap-5 rounded-2xl bg-[var(--badge-bg)] p-4 sm:min-h-52 sm:flex-row sm:items-center sm:p-6"><PartyPopper aria-hidden="true" className="h-14 w-14 shrink-0 text-[var(--gold-primary)]" /><p className="min-w-0 font-serif text-xl font-bold leading-snug sm:text-3xl">Build a presence.<br />Start a conversation.<br />Create an experience.</p></div>
          <p className="mb-3 mt-6 text-sm text-[var(--text-muted)]">A connected approach to your online presence</p>
          <div className="grid grid-cols-2 gap-3">{[[Camera, "Create"], [CalendarDays, "Post"], [Megaphone, "Promote"], [ChartNoAxesCombined, "Learn"]].map(([Icon, label]) => {
            const TileIcon = Icon as typeof Camera;
            return <div key={String(label)} className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] p-3"><TileIcon aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--gold-primary)]" /><span>{String(label)}</span></div>;
          })}</div>
        </div>
      </section>

      <section className="border-y border-[var(--border-subtle)] bg-[var(--bg-elevated)]" aria-labelledby="problem-title"><div className={sectionClass}>
        <p className={eyebrowClass}>Sound familiar?</p>
        <h2 id="problem-title" className={headingClass}>Running your business is already a full-time job.</h2>
        <div className="mt-9 grid gap-8 md:grid-cols-3">{[
          ["The feed goes quiet", "Between daily operations, customers and deadlines, consistent posting is the first thing to slip."],
          ["Good work goes unseen", "A strong product, service or event needs a clear message and a plan to reach the right people."],
          ["The numbers feel unclear", "Likes are encouraging. Understanding which content and campaigns bring enquiries takes a plan."],
        ].map(([heading, text]) => <article key={heading}><h3 className="mb-3 text-xl font-semibold">{heading}</h3><p className="leading-relaxed text-[var(--text-muted)]">{text}</p></article>)}</div>
      </div></section>

      <section id="services" className={`${sectionClass} scroll-mt-28`} aria-labelledby="services-title">
        <p className={eyebrowClass}>What we do</p><h2 id="services-title" className={headingClass}>From your daily content to your biggest moments.</h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">Choose social media management, ad campaigns, brand creatives or event support. We agree the channels, deliverables, approvals and reporting before work begins.</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">{SOCIAL_SERVICES.map(service => <ServiceCard key={service.title} service={service} />)}</div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24" aria-labelledby="bundle-title">
        <div className="grid gap-10 rounded-3xl border border-[var(--border-highlight)] bg-[var(--badge-bg)] p-7 sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:p-16">
          <div><p className={eyebrowClass}>One team. A connected experience.</p><h2 id="bundle-title" className={headingClass}>Marketing and technology, working together.</h2><p className="mt-5 text-lg leading-relaxed text-[var(--text-muted)]">Pair your marketing with a business website, a campaign landing page or an event registration experience. For restaurants and cafes, add Vicinix Menu to connect discovery with the table.</p><Link href="/products/vicinix-menu" className="mt-6 inline-flex py-2 font-semibold text-[var(--gold-primary)] underline underline-offset-4">Explore the Vicinix QR menu system</Link></div>
          <div className="flex flex-col justify-center gap-5">{["A website or landing page that turns interest into enquiries", "Event registration and check-in, or a restaurant QR menu", "Social content, branding and campaigns that bring it together"].map(text => <p key={text} className="flex items-start gap-3"><Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[var(--gold-primary)]" />{text}</p>)}<TrackedLink href="#quote" placement="website_bundle" className={`${primaryClass} mt-3 self-start`}>Ask about the bundle</TrackedLink></div>
        </div>
      </section>

      <section className="border-y border-[var(--border-subtle)]" aria-labelledby="process-title"><div className={sectionClass}>
        <p className={eyebrowClass}>How it works</p><h2 id="process-title" className={headingClass}>A clear plan. A regular rhythm.</h2>
        <ol className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">{[
          ["Quick call", "Tell us about your business or event, audience and goals. We agree a scope and send your quote."],
          ["Strategy & content plan", "We plan content, campaigns or event milestones, with an approval process that fits your team."],
          ["Execution", "We create and publish content, manage campaigns and coordinate the event work agreed in your scope."],
          ["Review & reporting", "We review ongoing campaigns monthly, or share an event wrap-up, and plan the next steps."],
        ].map(([heading, text]) => <li key={heading} className="border-t-2 border-[var(--border-highlight)] pt-5"><h3 className="mb-3 text-xl font-semibold">{heading}</h3><p className="leading-relaxed text-[var(--text-muted)]">{text}</p></li>)}</ol>
      </div></section>

      <section className={sectionClass} aria-labelledby="proof-title">
        <p className={eyebrowClass}>Explore our work</p><h2 id="proof-title" className={headingClass}>Built by Vicinix. Ready to explore.</h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)]">Try our existing software demos to see how we approach digital experiences. These showcase our product work; marketing results depend on each engagement.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3"><ProofCard event title="Vicinix Events" description="Explore our QR ticketing and event check-in platform, built to support registrations and access at the gate." href="/products/vicinix-events" /><ProofCard menu title="Vicinix Menu" description="Explore a restaurant QR menu and ordering experience, with a kitchen view and table management." href="/apps/menu" /><ProofCard title="Vicinix Invoice" description="Explore our invoicing studio to see another example of the business tools we build." href="/apps/invoice" /></div>
      </section>

      <CaseStudies />

      <section className="mx-auto max-w-4xl px-5 pb-16 sm:px-8 sm:pb-24" aria-labelledby="faq-title"><p className={eyebrowClass}>Before we get started</p><h2 id="faq-title" className={`${headingClass} mb-9`}>A few useful answers.</h2><FAQ items={SOCIAL_FAQS} /></section>

      <section id="quote" className="scroll-mt-24 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]" aria-labelledby="quote-title"><div className={`${sectionClass} grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]`}>
        <div><p className={eyebrowClass}>Let’s talk about your place</p><h2 id="quote-title" className={headingClass}>Your next chapter starts with a conversation.</h2><p className="mt-6 text-lg leading-relaxed text-[var(--text-muted)]">Tell us what you are building and where you want to grow. We will put together a quote around your needs, with deliverables, ad spend and any event or vendor costs clearly separated.</p><div className="mt-8 flex items-center gap-3 text-[var(--gold-primary)]"><Layers aria-hidden="true" className="h-6 w-6 shrink-0" /><span>Social media. Branding. Campaigns. Events.</span></div><TrackedLink href={SOCIAL_WHATSAPP_URL} whatsapp placement="quote_intro" className="mt-8 inline-flex min-h-12 items-center font-semibold text-[var(--gold-primary)] underline underline-offset-4">Talk to us on WhatsApp</TrackedLink></div>
        <QuoteForm />
      </div></section>
    </main>
    <Footer />
  </>;
}
