import { ImageResponse } from "next/og";

export const alt = "Vicinix — marketing and event management for businesses and brands";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", padding: "72px", background: "#08090b", color: "#f5f5f7", justifyContent: "space-between" }}>
    <div style={{ display: "flex", fontSize: 28, letterSpacing: 5, color: "#d4af37" }}>VICINIX · MARKETING & EVENTS</div>
    <div style={{ display: "flex", fontSize: 72, lineHeight: 1.12, maxWidth: 1000 }}>Build your brand. Bring people together.</div>
    <div style={{ display: "flex", fontSize: 29, color: "#d4af37" }}>Social media · Campaigns · Branding · Events</div>
  </div>, size);
}
