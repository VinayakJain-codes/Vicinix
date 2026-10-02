import type { Metadata, Viewport } from "next";
import { Cinzel, Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { OrganizationJsonLd } from "@/components/JsonLd";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#030303" },
    { media: "(prefers-color-scheme: light)", color: "#FAF8F5" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Vicinix — High-Performance Software for Security, Finance & IT Logistics",
    template: "%s | Vicinix",
  },
  description:
    "Vicinix builds sovereign digital software across Security Operations, Modern Finance, and IT Enterprise Logistics. Explore our suite or commission custom software.",
  keywords: [
    "Vicinix",
    "Vicinix Security",
    "Vicinix Guard",
    "Vicinix Finance",
    "Vicinix Tax",
    "Vicinix Invoice",
    "Vicinix IT Solutions",
    "Vicinix Events",
    "Vicinix Menu",
    "Vicinix ERP",
    "Enterprise Software India",
    "Custom Software Engineering",
  ],
  authors: [{ name: "Vicinix Technologies", url: BASE_URL }],
  creator: "Vicinix",
  publisher: "Vicinix Technologies",
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
    locale: "en_US",
    url: BASE_URL,
    siteName: "Vicinix",
    title: "Vicinix — High-Performance Software Suite",
    description:
      "A sovereign multi-product ecosystem powering security management, modern tax & invoicing, and enterprise logistics.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vicinix — Sovereign Software Suite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vicinix — High-Performance Software Suite",
    description:
      "A sovereign multi-product ecosystem powering security management, modern tax & invoicing, and enterprise logistics.",
    images: ["/og-image.png"],
    creator: "@vicinix",
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cinzel.variable} ${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('vicinix-theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300">
        <OrganizationJsonLd />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
