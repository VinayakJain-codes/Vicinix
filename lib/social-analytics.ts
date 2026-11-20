type MarketingEvent = "social_quote_click" | "social_quote_submit" | "social_whatsapp_click";

// Connects to an existing GA/GTM installation without sending form contents or contact details.
export function trackSocialEvent(event: MarketingEvent, placement: string) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as Window & { dataLayer?: Record<string, unknown>[] };
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.dataLayer.push({ event, service: "social_media", placement });
  window.dispatchEvent(new CustomEvent("vicinix:analytics", { detail: { event, placement } }));
}
