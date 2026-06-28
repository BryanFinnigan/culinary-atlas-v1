import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "World Cuisine Explorer MVP",
  description: "Explore global cuisines through an interactive 2D map and structured cuisine profiles."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
