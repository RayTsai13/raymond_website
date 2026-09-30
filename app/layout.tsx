import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, EB_Garamond, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/nav/Footer";
import { NextTurnButton } from "@/components/nav/NextTurnButton";
import { SampleBanner } from "@/components/nav/SampleBanner";
import { site } from "@/content/site";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cinzel",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic"],
  variable: "--font-cormorant",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} · ${site.role}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f2",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cinzel.variable} ${ebGaramond.variable} ${cormorant.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-dvh">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}[data-reveal-draw]{transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="label sr-only z-[100] bg-lapis-800 px-4 py-2 text-gold-300 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <NextTurnButton />
        {site.sampleContent && <SampleBanner />}
      </body>
    </html>
  );
}
