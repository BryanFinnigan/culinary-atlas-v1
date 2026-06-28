import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Culinary Atlas | Food-first travel guides',
  description:
    'Discover food-first city guides with readable destination cards, practical planning steps, and memorable dishes to build your next trip around.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
