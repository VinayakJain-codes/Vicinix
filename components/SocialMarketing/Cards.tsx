import Link from "next/link";
import { Camera, CalendarDays, Megaphone, ChartNoAxesCombined, QrCode, ReceiptText, Palette, PartyPopper, Ticket } from "lucide-react";
import type { SOCIAL_SERVICES } from "@/lib/social-marketing";

const icons = { content: Camera, posting: CalendarDays, ads: Megaphone, reporting: ChartNoAxesCombined, branding: Palette, events: PartyPopper };

export function ServiceCard({ service }: { service: typeof SOCIAL_SERVICES[number] }) {
  const Icon = icons[service.icon];
  return <article className="liquid-glass rounded-3xl p-7 sm:p-8">
    <Icon aria-hidden="true" className="mb-6 h-7 w-7 text-[var(--gold-primary)]" />
    <h3 className="mb-3 font-serif text-2xl font-bold">{service.title}</h3>
    <p className="leading-relaxed text-[var(--text-muted)]">{service.description}</p>
  </article>;
}

export function ProofCard({ title, description, href, menu = false, event = false }: { title: string; description: string; href: string; menu?: boolean; event?: boolean }) {
  const Icon = event ? Ticket : menu ? QrCode : ReceiptText;
  return <article className="flex flex-col rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 sm:p-8">
    <div className="mb-6 flex h-28 items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--badge-bg)]"><Icon aria-hidden="true" className="h-12 w-12 text-[var(--gold-primary)]" /></div>
    <p className="mb-2 text-sm text-[var(--gold-primary)]">{event ? "Live client deployment · demo on request" : "Vicinix product · interactive demo"}</p>
    <h3 className="font-serif text-2xl font-bold">{title}</h3>
    <p className="my-4 flex-1 leading-relaxed text-[var(--text-muted)]">{description}</p>
    <Link href={href} className="mt-2 w-fit font-semibold text-[var(--gold-primary)] underline underline-offset-4">Explore {title}</Link>
  </article>;
}

// Render only when a client has approved the quote and attribution for publication.
export function Testimonial({ quote, name, business }: { quote: string; name: string; business: string }) {
  return <figure className="liquid-glass rounded-3xl p-8"><blockquote className="text-lg leading-relaxed">“{quote}”</blockquote><figcaption className="mt-5 text-[var(--text-muted)]">{name} · {business}</figcaption></figure>;
}

export function FAQ({ items }: { items: { question: string; answer: string }[] }) {
  return <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">{items.map(item => <details key={item.question} className="group py-5">
    <summary className="cursor-pointer pr-4 text-lg font-semibold marker:text-[var(--gold-primary)]">{item.question}</summary>
    <p className="mt-4 max-w-3xl leading-relaxed text-[var(--text-muted)]">{item.answer}</p>
  </details>)}</div>;
}
