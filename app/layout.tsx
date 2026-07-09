import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Culinary Atlas | Global Food Discovery & Taste Collections",
  description:
    "Explore world cuisines by country, learn the cultural context behind foods, and discover curated taste collections with practical products to try at home.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
