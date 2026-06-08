import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ScrollProgress from "@/components/providers/ScrollProgress";
import CommandPalette from "@/components/command/CommandPalette";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mall of America — Interactive Sales Deck",
  description:
    "A cinematic introduction to the world's most iconic retail and entertainment destination. Retail leasing, sponsorships, and event bookings.",
  metadataBase: new URL("https://frontend-wine-chi-26.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mall of America — Interactive Sales Deck",
    description:
      "A cinematic introduction to the world's most iconic retail and entertainment destination. Retail leasing, sponsorships, and event bookings.",
    url: "https://frontend-wine-chi-26.vercel.app",
    siteName: "Mall of America",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mall of America — Interactive Sales Deck",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mall of America — Interactive Sales Deck",
    description:
      "A cinematic introduction to the world's most iconic retail and entertainment destination. Retail leasing, sponsorships, and event bookings.",
    images: ["/images/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <link rel="preload" href="/images/hero-bg.jpg" as="image" />
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
        <CommandPalette />
      </body>
    </html>
  );
}
