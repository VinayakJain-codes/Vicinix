import type { Metadata } from "next";
import { Bebas_Neue, Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { Analytics } from "@vercel/analytics/next";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const BASE_URL = "https://vicinix.co.in";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Vicinix | Your Idea, Shipped.",
    template: "%s | Vicinix",
  },
  description:
    "Vicinix designs and engineers digital products that don't just work — they convert. Full-stack web development, SaaS, and AI-powered solutions for startups and enterprises.",
  keywords: [
    "Vicinix",
    "web development",
    "full stack developer",
    "Next.js",
    "SaaS development",
    "startup development",
    "India web agency",
    "Vinayak Jain",
    "UI/UX design",
    "software engineering",
  ],
  authors: [{ name: "Vicinix", url: BASE_URL }],
  creator: "Vicinix",
  publisher: "Vicinix",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Vicinix",
    title: "Vicinix | Your Idea, Shipped.",
    description:
      "We design and engineer digital products that don't just work — they convert. Full-stack web development and SaaS for startups.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vicinix — Your Idea, Shipped.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vicinix | Your Idea, Shipped.",
    description:
      "We design and engineer digital products that don't just work — they convert.",
    images: ["/og-image.png"],
    creator: "@vicinix",
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/Vicinix.ico",
    shortcut: "/Vicinix.ico",
    apple: "/Vicinix.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased min-h-screen selection:bg-accent-orange selection:text-black">
        <GrainOverlay />
        <ScrollProgress />
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
