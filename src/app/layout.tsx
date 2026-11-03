import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AccessibilityTools, SkipToContent } from '@/components/accessibility-tools';
import { FirebaseSignals } from '@/components/firebase-signals';
import { OfflineShell } from '@/components/offline-shell';
import { PullToRefresh } from '@/components/pull-to-refresh';

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${display.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col"><script dangerouslySetInnerHTML={{ __html: "try{var s=JSON.parse(localStorage.getItem('schoolquest.accessibility.v1')||'{}');if([100,125,150,175,200].includes(Number(s.textSize)))document.documentElement.style.fontSize=Number(s.textSize)+'%';if(s.calmDisplay===true)document.documentElement.dataset.a11yCalm='true'}catch(e){}" }} /><SkipToContent /><PullToRefresh /><FirebaseSignals /><OfflineShell />{children}<AccessibilityTools /></body>
    </html>
  );
}
