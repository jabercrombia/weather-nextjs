import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import 'dotenv/config';
import "./globals.css";
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['100','300','400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata:Metadata = {
  title: `Weather NextJs App`,
  description: `This is a weather app built with NextJS`,
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'Justin Abercrombia', url: 'http://www.github.com/jabercrombia' }],
  creator: 'Justin Abercrombia',
  openGraph: {
    title: 'Weather Forecast App',
    description: 'Get accurate, real-time weather forecasts with WeatherWise. Built using Next.js and TypeScript, and deployed on Vercel for lightning-fast performance',
    url: 'https://weather-nextjs-zeta.vercel.app/',
    siteName: 'Weather Forecast App',
    images: [
      {
        url: '/images/results.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: '/images/results.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'results page',
      },
    ],
    locale: 'en_US',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
      </body>
      <GoogleAnalytics gaId={`${process.env.NEXT_PUBLIC_GA4}`} />
    </html>
  );
}
