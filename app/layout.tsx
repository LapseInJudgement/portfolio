import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: 'Ahmad Kawkab | Developer',
  description: 'Full-stack developer navigating the infinite expanse of code and creativity.',
  keywords: ['developer', 'portfolio', 'full-stack', 'react', 'next.js', 'typescript'],
  authors: [{ name: 'Ahmad Kawkab', url: 'https://github.com/lapseinjudgement' }],
  creator: 'Ahmad Kawkab',
  openGraph: {
    type: 'website',
    title: 'Ahmad Kawkab | Developer',
    description: 'Full-stack developer navigating the infinite expanse of code and creativity.',
    siteName: 'Ahmad Kawkab',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmad Kawkab | Developer',
    description: 'Full-stack developer navigating the infinite expanse of code and creativity.',
    creator: '@lapseinjudgement',
  },
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

export const viewport: Viewport = {
  themeColor: '#030303',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-[#030303]">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#030303] text-[#F5F5F7]`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
