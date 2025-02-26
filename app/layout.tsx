import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';

import "./globals.css";
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['100','300','400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
const backgroundImage = {
  backgroundImage: 'url(./images/background.jpeg)',
  backgroundAttachment: 'fixed', 
  backgroundSize: '100% 100%'
};
export const metadata:Metadata = {
  title: `Weather NextJs App`,
  description: `This is a weather app built with NextJS`,
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'Justin Abercrombia', url: 'http://www.github.com/jabercrombia' }],
  creator: 'Justin Abercrombia',
  openGraph: {
    images: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className} style={backgroundImage}>
        {children}
      </body>
      <GoogleAnalytics gaId="G-2B542KX6WR" />
    </html>
  );
}
