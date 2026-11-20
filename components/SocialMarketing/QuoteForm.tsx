"use client";

import { useRef, useState, type FormEvent } from "react";
import { sendSocialQuote } from "@/lib/social-email";
import { SOCIAL_WHATSAPP_URL, validateSocialLead, type SocialLead } from "@/lib/social-marketing";
import { trackSocialEvent } from "@/lib/social-analytics";
import TrackedLink from "./TrackedLink";

const inputClass = "mt-2 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)] px-4 py-3 text-base text-[var(--text-primary)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-primary)]";

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const sending = useRef(false);
  const feedback = useRef<HTMLParagraphElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    const lead = Object.fromEntries(["name", "businessName", "phone", "instagram", "needs", "budget"].map(key => [key, String(data.get(key) || "").trim()])) as SocialLead;
    const validation = validateSocialLead(lead);
    if (validation) { setError(validation); setStatus("error"); requestAnimationFrame(() => feedback.current?.focus()); return; }
    sending.current = true;
    setStatus("sending");
    setError("");
    try {
      const result = await sendSocialQuote(lead);
      if (result.success) {
        setStatus("success");
        form.reset();
        trackSocialEvent("social_quote_submit", "quote_form");
      } else { setError(result.error || "Please try again or contact us on WhatsApp."); setStatus("error"); }
    } catch { setError("Please try again or contact us on WhatsApp."); setStatus("error"); }
    finally { sending.current = false; requestAnimationFrame(() => feedback.current?.focus()); }
  }

  return <div className="liquid-glass rounded-3xl p-6 sm:p-10">
    <form onSubmit={submit} aria-label="Request a marketing or event quote" aria-busy={status === "sending"}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">Your name <span aria-hidden="true">*</span><input name="name" autoComplete="name" required minLength={2} maxLength={100} className={inputClass} /></label>
        <label className="text-sm font-medium">Business / event name <span aria-hidden="true">*</span><input name="businessName" autoComplete="organization" required minLength={2} maxLength={160} className={inputClass} /></label>
        <label className="text-sm font-medium">Phone / WhatsApp <span aria-hidden="true">*</span><input name="phone" type="tel" autoComplete="tel" required maxLength={25} placeholder="+91" className={inputClass} /></label>
        <label className="text-sm font-medium">Instagram handle (optional)<input name="instagram" autoCapitalize="none" spellCheck={false} maxLength={31} placeholder="@yourbrand" className={inputClass} /></label>
        <label className="text-sm font-medium sm:col-span-2">What do you need? <span aria-hidden="true">*</span><textarea name="needs" required minLength={10} maxLength={2000} rows={4} placeholder="Tell us about your business or event, location and goals. Need social media, ads, branding, event management or a website?" className={inputClass} /></label>
        <label className="text-sm font-medium sm:col-span-2">Budget range (optional)<input name="budget" maxLength={100} placeholder="Share a monthly or project budget, or leave blank" className={inputClass} /></label>
      </div>
      <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="my-5 text-sm leading-relaxed text-[var(--text-muted)]">By sending, you agree that Vicinix may contact you by phone or WhatsApp about this enquiry. Your details are emailed to our team. Fields marked * are required.</p>
      <button type="submit" disabled={status === "sending"} className="min-h-12 w-full cursor-pointer rounded-xl bg-[var(--text-primary)] px-6 py-3 font-semibold text-[var(--bg-base)] disabled:cursor-wait disabled:opacity-60 sm:w-auto">{status === "sending" ? "Sending your request…" : "Request my free quote"}</button>
      <p ref={feedback} tabIndex={-1} role="status" aria-live="polite" className="mt-4 leading-relaxed text-[var(--text-primary)]">{status === "success" ? "Thanks! Your request has been sent. Our team will contact you using the number you provided." : error}</p>
    </form>
    <div className="mt-6 border-t border-[var(--border-subtle)] pt-6"><p className="mb-3 text-[var(--text-muted)]">Prefer a quick conversation?</p><TrackedLink href={SOCIAL_WHATSAPP_URL} whatsapp placement="quote_form" className="inline-flex min-h-12 items-center rounded-xl border border-[var(--border-highlight)] px-5 py-3 font-semibold text-[var(--gold-primary)]">Chat on WhatsApp</TrackedLink><a href="mailto:vinayak@vicinix.co.in" className="mt-4 block break-all text-sm text-[var(--text-muted)] underline underline-offset-4">vinayak@vicinix.co.in</a></div>
  </div>;
}
