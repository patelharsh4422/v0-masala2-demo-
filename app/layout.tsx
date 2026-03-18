import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: 'A Magic Masala Restaurant & Banquets | Vastral, Ahmedabad',
  description: 'Experience exquisite Indian cuisine at A Magic Masala Restaurant & Banquets in Vastral, Ahmedabad. Book your table for fine dining or celebrate special occasions in our premium banquet halls.',
  keywords: 'Magic Masala, restaurant, Vastral, Ahmedabad, Indian cuisine, banquets, fine dining, wedding venue',
  openGraph: {
    title: 'A Magic Masala Restaurant & Banquets',
    description: 'Premium Indian dining experience in Vastral, Ahmedabad',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
