import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/shell";
import { LearnerExtras } from "@/components/learner-extras";

export const metadata: Metadata = {
  title: "Explore as a guest",
  description: "Try Kito’s mini quest and explore primary school learning videos without an account.",
  alternates: { canonical: "/guest" },
};

export default function GuestPage() {
  return (
    <div data-space="student" className="min-h-screen">
      <main className="mx-auto max-w-4xl space-y-5 px-5 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <BrandMark href="/" />
          <Link href="/" className="space-back">Back to home</Link>
        </div>
        <div>
          <p className="space-label">Guest visit</p>
          <h1 className="font-display mt-2">Explore School Quest</h1>
          <p className="mt-2 text-muted-foreground">Watch a learning video or try a mini quest. Sign in to find material for your class and save your progress.</p>
        </div>
        <nav aria-label="Choose a guest activity" className="flex flex-wrap gap-3">
          <a className="quest-button quest-button-secondary" href="#educational-videos">Watch videos</a>
          <a className="quest-button quest-button-secondary" href="#edutainment">Play a mini quest</a>
          <Link className="quest-button" href="/login">Sign in</Link>
        </nav>
        <LearnerExtras />
      </main>
    </div>
  );
}
