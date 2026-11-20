import Link from "next/link";
import { Megaphone, CalendarDays, Globe, Workflow } from "lucide-react";

const goals = [
  { title: "Get more enquiries", description: "Reach your audience with content, ads and a clear marketing plan.", href: "/social-media#services", icon: Megaphone },
  { title: "Manage an event", description: "Explore event software, or discuss promotion and coordination.", href: "/products/vicinix-events", icon: CalendarDays },
  { title: "Build a website", description: "Commission a website built around your business and customers.", href: "/enquire?goal=website", icon: Globe },
  { title: "Automate my business", description: "Replace repetitive work with software tailored to your operations.", href: "/enquire?goal=automation", icon: Workflow },
];

export default function ChooseGoal() {
  return <section aria-labelledby="goal-title" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--gold-primary)]">Choose your goal</p>
    <h2 id="goal-title" className="scroll-mt-28 font-serif text-3xl font-bold sm:text-4xl">What would you like to do next?</h2>
    <p className="mt-4 max-w-2xl text-lg text-[var(--text-muted)]">Start with the outcome you need. We will help you find the right service or software.</p>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{goals.map(({ title, description, href, icon: Icon }) => <Link key={title} href={href} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 transition-colors hover:border-[var(--gold-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold-primary)]">
      <Icon aria-hidden="true" className="mb-5 h-6 w-6 text-[var(--gold-primary)]" /><h3 className="mb-3 text-xl font-semibold">{title}</h3><p className="leading-relaxed text-[var(--text-muted)]">{description}</p>
    </Link>)}</div>
  </section>;
}
