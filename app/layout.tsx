import type { Metadata } from "next";
import { Lora, Source_Sans_3 } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import AtlasFooter from "@/components/AtlasFooter";
import "./globals.css";

const serif = Lora({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const sans = Source_Sans_3({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://culinaryatlasguide.com"),
  title: { default: "Culinary Atlas | Explore the World Through Food", template: "%s | Culinary Atlas" },
  description: "Discover world cuisines, regional food traditions, pantry essentials, kitchen tools, and carefully curated culinary guides.",
  openGraph: { title: "Culinary Atlas", description: "Explore the world, one cuisine at a time.", type: "website", url: "https://culinaryatlasguide.com" },
  twitter: { card: "summary_large_image", title: "Culinary Atlas", description: "Explore the world, one cuisine at a time." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <AtlasFooter />
      </body>
    </html>
  );
}
