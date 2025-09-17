import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Hind_Siliguri } from 'next/font/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hindSiliguri = Hind_Siliguri({ 
  subsets: ['latin'], 
  weight: ['300', '400', '600', '700'], 
  variable: '--font-devanagari' 
});

export const metadata: Metadata = {
  title: "Vimana Ride-Hailing",
  description: "A divine ride-hailing app inspired by Hindu mythology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${hindSiliguri.variable}`}>
        {children}
      </body>
    </html>
  );
}