"use client";

import { useState } from "react";
import { Coffee, Check, Gift } from "lucide-react";

const target = 6;

export default function LoyaltyPreview() {
  const [stamps, setStamps] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [message, setMessage] = useState("Add a sample visit to see how the card works.");
  return <section id="loyalty-preview" aria-labelledby="loyalty-preview-title" className="mb-16 grid scroll-mt-28 gap-8 rounded-3xl border border-[var(--border-highlight)] bg-[var(--badge-bg)] p-6 sm:p-10 lg:grid-cols-2">
    <div><p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--gold-primary)]">Interactive concept · sample data</p><h2 id="loyalty-preview-title" className="font-serif text-3xl font-bold">A little thank-you for coming back.</h2><p className="mt-4 leading-relaxed text-[var(--text-muted)]">Try a sample card: six visits unlock a complimentary coffee. Businesses would set their own rewards and qualifying purchase rules.</p><p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">This preview resets on refresh. Stamps and rewards have no monetary value. The production product and connection to Vicinix Menu are planned.</p></div>
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-base)] p-6">
      <div className="flex items-center gap-3"><Coffee aria-hidden="true" className="h-6 w-6 text-[var(--gold-primary)]" /><h3 className="text-xl font-semibold">Sample cafe reward card</h3></div>
      <p className="mt-3 text-[var(--text-muted)]">{stamps} of {target} stamps · {rewards} sample rewards redeemed</p>
      <ol aria-label="Stamp progress" className="my-6 grid grid-cols-3 gap-3 sm:grid-cols-6">{Array.from({ length: target }, (_, index) => <li key={index} aria-label={`Visit ${index + 1}: ${index < stamps ? "stamped" : "empty"}`} className={`flex aspect-square items-center justify-center rounded-xl border ${index < stamps ? "border-[var(--gold-primary)] bg-[var(--badge-bg)] text-[var(--gold-primary)]" : "border-[var(--border-subtle)] text-[var(--text-muted)]"}`}>{index < stamps ? <Check aria-hidden="true" className="h-6 w-6" /> : <Coffee aria-hidden="true" className="h-5 w-5" />}</li>)}</ol>
      <div className="flex flex-wrap gap-3">
        <button type="button" disabled={stamps === target} onClick={() => { const next = Math.min(stamps + 1, target); setStamps(next); setMessage(next === target ? "Your sample reward is ready. Try redeeming it." : `Sample visit added. ${target - next} more to unlock a reward.`); }} className="min-h-11 cursor-pointer rounded-xl bg-[var(--text-primary)] px-4 py-3 font-semibold text-[var(--bg-base)] disabled:cursor-default disabled:opacity-50">Add sample visit</button>
        <button type="button" disabled={stamps < target} onClick={() => { if (stamps < target) return; setStamps(0); setRewards(rewards + 1); setMessage("Sample reward redeemed! Your next stamp card is ready."); }} className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border-highlight)] px-4 py-3 font-semibold text-[var(--gold-primary)] disabled:cursor-default disabled:opacity-50"><Gift aria-hidden="true" className="h-4 w-4" />Redeem sample reward</button>
        <button type="button" onClick={() => { setStamps(0); setRewards(0); setMessage("Preview reset. Add a sample visit to start again."); }} className="min-h-11 cursor-pointer px-2 py-3 text-sm underline underline-offset-4">Reset preview</button>
      </div><p role="status" aria-live="polite" className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">{message}</p>
    </div>
  </section>;
}
