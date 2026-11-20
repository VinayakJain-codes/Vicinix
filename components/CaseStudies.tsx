import Link from "next/link";
import { PUBLISHED_CASE_STUDIES } from "@/lib/case-studies";

export default function CaseStudies() {
  if (!PUBLISHED_CASE_STUDIES.length) return null;
  return <section id="case-studies" aria-labelledby="case-study-title" className="relative z-10 mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24">
    <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--gold-primary)]">From a client engagement</p>
    <h2 id="case-study-title" className="mb-8 font-serif text-3xl font-bold sm:text-4xl">The work. The outcome.</h2>
    {PUBLISHED_CASE_STUDIES.map(study => <article key={study.slug} className="rounded-3xl border border-[var(--border-highlight)] bg-[var(--bg-surface)] p-6 sm:p-10">
      <p className="mb-3 text-sm text-[var(--text-muted)]">{study.client}</p><h3 className="font-serif text-2xl font-bold sm:text-3xl">{study.title}</h3>
      <div className="my-8 grid gap-8 md:grid-cols-2"><div><h4 className="mb-2 font-semibold">The problem</h4><p className="leading-relaxed text-[var(--text-muted)]">{study.problem}</p></div><div><h4 className="mb-2 font-semibold">What we delivered</h4><p className="leading-relaxed text-[var(--text-muted)]">{study.delivered}</p></div></div>
      <dl className="grid grid-cols-2 gap-6 border-y border-[var(--border-subtle)] py-6">{study.results.map(result => <div key={result.label}><dt className="text-sm text-[var(--text-muted)]">{result.label}</dt><dd className="mt-2 font-serif text-4xl font-bold text-[var(--gold-primary)]">{result.value}</dd></div>)}</dl>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">{study.evidence}</p><Link href={study.productHref} className="mt-6 inline-flex min-h-11 items-center font-semibold text-[var(--gold-primary)] underline underline-offset-4">Explore the event software</Link>
    </article>)}
  </section>;
}
