import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { JoinForm } from "@/components/join-form";
import { GoogleSignInButton } from "@/components/google-sign-in";
import { BrandMark } from "@/components/shell";
import { SignInForm } from "@/components/sign-in-form";
import { PublicMobileNav } from "@/components/public-mobile-nav";
import { StudentsPhoto } from "@/components/students-photo";
import { ArrowLeft, ShieldCheck } from 'lucide-react';

import { getSessionUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { PATHWAYS } from "@/lib/pathways";

export const metadata: Metadata = { title: "Sign in", robots: { index: false, follow: true } };

const errors: Record<string, string> = {
  exists: "This phone already has an account. Sign in to continue.",
  google: "Google sign-in could not finish. Try again, or use your phone and PIN.",
  missing: "Add your name, class, phone, and PIN.",
  limited: "Too many tries. Wait a few minutes, then try again.",
  invalid: "That phone and PIN did not match.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; tab?: string; role?: string }> }) {
  if (await getSessionUser()) redirect("/start");
  const { error, tab, role } = await searchParams;
  const join = tab === 'join';
  const learner = join && (role === 'learner' || Boolean(error));
  const classes = learner ? await db.classGrade.findMany({ where: { isActive: true }, orderBy: { order: 'asc' }, select: { id: true, name: true, shortName: true } }) : [];
  return <div className="mobile-navigation-page mobile-app-frame auth-page min-h-screen">
    <header className="mobile-app-bar lg:hidden px-5 flex items-center justify-between"><BrandMark /><Link href="/" className="icon-button" aria-label="Back to home"><ArrowLeft className="h-5 w-5" /></Link></header>
    <div className="auth-layout">
      <section className="auth-photo-panel">
        <StudentsPhoto priority className="auth-photo" />
        <div className="auth-photo-copy">
          <p className="eyebrow">Two smiles. One classroom.</p>
          <h1 className="font-display">Small steps. Brilliant futures.</h1>
        </div>
      </section>
      <main className="auth-form-panel">
        <div className="w-full max-w-[440px] mx-auto page-rise">
          <div className="mb-5"><span className="eyebrow">YOUR NEXT CHAPTER</span><h1 className="font-display mt-2 text-3xl sm:text-4xl">{join ? 'Get started' : 'Welcome back!'} <span className="inline-block wave-hand" aria-hidden="true">{join ? '🌱' : '👋'}</span></h1><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{join ? (learner ? 'Choose your class to find the right notes and practice.' : 'Choose the space that fits what you do.') : 'Sign in to open your School Quest dashboard.'}</p></div>
          <div className="auth-tabs mb-5"><Link href="/login" aria-current={!join ? 'page' : undefined} className={!join ? 'is-active' : ''}>Sign in</Link><Link href="/login?tab=join" aria-current={join ? 'page' : undefined} className={join ? 'is-active' : ''}>Create account</Link></div>
          {error && <p role="alert" className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{errors[error] || "That phone and PIN did not match."}</p>}
          {join && !learner ? (
            <ul className="grid gap-2" aria-label="Choose your role">
              {PATHWAYS.map((path, index) => (
                <li key={path.id}>
                  <Link href={["/login?tab=join&role=learner", "/register/teacher", "/register/school", "/login?role=site"][index]}
                    className="block rounded-2xl border p-4 hover:bg-muted">
                    <span className="block font-bold text-primary">{path.label}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{path.line}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <>
              {learner && <Link href="/login?tab=join" className="mb-4 block text-sm font-bold text-primary">← Choose a different role</Link>}
              {role === "site" && <p className="mb-4 rounded-2xl border p-4 text-sm">Site managers use an account assigned by the School Quest team. Sign in with the phone and PIN or Google account linked to your access.</p>}
              <GoogleSignInButton />
              <div className="auth-divider"><span>{learner ? "or create with a phone" : "or use your phone"}</span></div>
              {learner ? <JoinForm classes={classes} /> : <SignInForm />}
            </>
          )}
          <Link href="/guest" className="mt-5 block text-center font-bold text-primary underline">Continue as a guest</Link>
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 text-primary" /> Your learning. Your own secure space.</p>
        </div>
      </main>
    </div>
    <PublicMobileNav />
  </div>;
}
