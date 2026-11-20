"use client";

import Link from "next/link";
import { trackSocialEvent } from "@/lib/social-analytics";

export default function TrackedLink({ href, placement, children, className, whatsapp = false }: {
  href: string; placement: string; children: React.ReactNode; className?: string; whatsapp?: boolean;
}) {
  return <Link href={href} className={className} onClick={() => trackSocialEvent(whatsapp ? "social_whatsapp_click" : "social_quote_click", placement)}>{children}</Link>;
}
