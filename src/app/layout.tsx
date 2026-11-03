import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { SHARE_URL } from "@/lib/company";
import { AccessibilityTools, SkipToContent } from '@/components/accessibility-tools';
import { FirebaseSignals } from '@/components/firebase-signals';
import { OfflineShell } from '@/components/offline-shell';
import { PullToRefresh } from '@/components/pull-to-refresh';

const nunito = Nunito({
  variable: "--font-school-quest",
  subsets: ["latin"],
  display: "swap",
});

const description = "Explore Ugandan primary school notes, quizzes, past papers and learning videos with School Quest, from Baby Class to Primary 7.";

export const metadata: Metadata = {
  metadataBase: new URL(SHARE_URL),
  title: { default: "School Quest | Uganda Primary School Learning", template: "%s | School Quest" },
  description,
  applicationName: "School Quest",
  icons: { icon: "/icon-192.png", apple: "/icon-192.png" },
  openGraph: {
    type: "website",
    siteName: "School Quest",
    title: "School Quest | Uganda Primary School Learning",
    description,
    images: [{ url: "/illustrations/quest-read-together.webp", width: 768, height: 512, alt: "Two children reading with Kito the owl" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${nunito.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col"><script dangerouslySetInnerHTML={{ __html: "try{var s=JSON.parse(localStorage.getItem('schoolquest.accessibility.v1')||'{}');if([100,125,150,175,200].includes(Number(s.textSize)))document.documentElement.style.fontSize=Number(s.textSize)+'%';if(s.calmDisplay===true)document.documentElement.dataset.a11yCalm='true'}catch(e){}" }} /><SkipToContent /><PullToRefresh /><FirebaseSignals /><OfflineShell />{children}<AccessibilityTools /></body>
    </html>
  );
}
