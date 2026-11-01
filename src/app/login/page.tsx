import Link from "next/link";
import { db } from "@/lib/db";
import { JoinForm } from "@/components/join-form";
import { GoogleSignInButton } from "@/components/google-sign-in";
import { BrandMark } from "@/components/shell";
import { SignInForm } from "@/components/sign-in-form";
import { PublicMobileNav } from "@/components/public-mobile-nav";
import { QuestArt } from "@/components/quest-art";
import { BookOpen, Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';

const errors: Record<string, string> = { exists: 'This phone already has an account. Sign in to continue.', google: 'Google sign-in could not finish. Try your phone and password instead.', school: 'Please choose a school from the suggestions.', missing: 'Please complete all the required fields.' };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; tab?: string; pathway?: string }> }) {
  const { error, tab, pathway } = await searchParams;
  const join = tab === 'join';
  const classes = join ? await db.classGrade.findMany({ where: { isActive: true }, orderBy: { order: 'asc' }, select: { id: true, name: true, shortName: true } }) : [];
  return <div className="mobile-navigation-page mobile-app-frame auth-page min-h-screen">
    <header className="mobile-app-bar lg:hidden px-5 flex items-center justify-between"><BrandMark /><Link href="/" className="icon-button" aria-label="Back to home"><ArrowLeft className="h-5 w-5" /></Link></header>
    <div className="auth-layout">
      <aside className="auth-story hidden lg:flex">
        <BrandMark />
        <div className="relative z-10 my-auto py-10">
          <span className="eyebrow"><Sparkles className="h-4 w-4" /> MADE FOR CURIOUS MINDS</span>
          <h1 className="font-display mt-6 text-5xl leading-tight">Small steps.<br /><span className="text-primary">Brilliant futures.</span></h1>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted-foreground">A welcoming space to learn, practise, and grow. Your next discovery starts here.</p>
          <QuestArt />
        </div>
        <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"><BookOpen className="h-4 w-4" /> Rooted in the Ugandan curriculum</p>
      </aside>
      <main className="auth-form-panel">
        <div className="w-full max-w-[440px] mx-auto page-rise">
          <div className="mb-5"><span className="eyebrow">YOUR NEXT CHAPTER</span><h1 className="font-display mt-2 text-3xl sm:text-4xl">{join ? 'Let curiosity lead.' : 'Welcome back!'} <span className="inline-block wave-hand" aria-hidden="true">{join ? '🌱' : '👋'}</span></h1><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{join ? 'Create your learner account and start your journey.' : 'Big ideas start with one little step. Let’s take yours.'}</p></div>
          <div className="auth-tabs mb-5"><Link href="/login" aria-current={!join ? 'page' : undefined} className={!join ? 'is-active' : ''}>Sign in</Link><Link href="/login?tab=join" aria-current={join ? 'page' : undefined} className={join ? 'is-active' : ''}>Create account</Link></div>
          {error && <p role="alert" className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{errors[error] || 'That phone and password did not match. Please try again.'}</p>}
          {join ? <JoinForm classes={classes} /> : <><SignInForm pathway={pathway} /><div className="auth-divider"><span>or continue with</span></div><GoogleSignInButton /></>}
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 text-primary" /> Your learning. Your own secure space.</p>
        </div>
      </main>
    </div>
    <PublicMobileNav />
  </div>;
}
