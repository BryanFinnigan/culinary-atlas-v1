import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

const title = 'Culinary Atlas | Food-first travel guides'
const description =
  'Discover food-first city guides with readable destination cards, practical planning steps, and memorable dishes to build your next trip around.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
