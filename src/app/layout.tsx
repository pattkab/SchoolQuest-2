import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AccessibilityTools, SkipToContent } from '@/components/accessibility-tools';
import { OfflineShell } from '@/components/offline-shell';

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const display = Fraunces({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "School Quest",
  description: "Read, practice and get marked. Baby Class to P.7.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col"><SkipToContent /><OfflineShell />{children}<AccessibilityTools /></body>
    </html>
  );
}
