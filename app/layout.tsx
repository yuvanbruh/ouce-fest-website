import React from "react"
import type { Metadata } from 'next'
import { Rajdhani } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-main",
});

export const metadata: Metadata = {
    title: 'Mecharena 2026 | Ouce Mechanical Fest',
  description: 'Mecharena – a fusion of mechanical engineering, robotics and futuristic innovation.',

  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${rajdhani.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
