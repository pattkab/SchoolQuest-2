import Link from 'next/link';
import { BrandMark } from '@/components/shell';
import { SiteFooter } from '@/components/site-footer';
import { PublicMobileNav } from '@/components/public-mobile-nav';
import { KitoMascot } from '@/components/kito-mascot';
import { ArrowRight, GraduationCap, Presentation } from 'lucide-react';

const starts = [
  { label: 'Little explorers', grade: 'Baby · Middle · Top', emoji: '🌱' },
  { label: 'Bright beginners', grade: 'Primary 1–3', emoji: '🎨' },
  { label: 'Growing minds', grade: 'Primary 4–6', emoji: '🔬' },
  { label: 'Future ready', grade: 'Primary 7', emoji: '🚀' },
];

export default function Home() {
  return <div className="mobile-navigation-page mobile-app-frame min-h-screen flex flex-col">
    <header className="mobile-app-bar lg:sticky lg:top-0 px-5 md:px-10 flex items-center justify-between lg:py-4"><BrandMark /><div className="flex items-center gap-5"><Link href="/login" className="hidden sm:inline text-sm font-bold">Sign in</Link><Link href="/login?tab=join" className="quest-button quest-button-small">Get started <ArrowRight className="h-4 w-4" /></Link></div></header>
    <main className="flex-1">
      <section className="landing-hero page-rise max-w-6xl mx-auto px-5 md:px-10">
        <div>
          <h1 className="font-display display-hero">A brighter future.<br /><span className="text-primary">One quest at a time.</span></h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">Notes and practice, from Baby Class to P.7.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Link href="/login?tab=join&role=learner" className="quest-button">Start learning <ArrowRight className="h-5 w-5" /></Link><Link href="/login" className="quest-button quest-button-secondary">Sign in</Link></div>
        </div>
        <figure className="quest-mascot-stage order-first lg:order-last">
          <KitoMascot />
          <figcaption>Hi, I’m Kito! Let’s learn together.</figcaption>
        </figure>
      </section>
      <section className="max-w-6xl mx-auto px-5 md:px-10 py-8">
        <div className="section-heading"><div><h2 className="font-display text-2xl">Find your spark. Pick where you begin.</h2></div><GraduationCap className="h-8 w-8 text-primary" /></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">{starts.map((band, index) => <Link key={band.label} href="/login?tab=join&role=learner" className={`subject-tile subject-tone-${index}`}><span className="text-3xl" aria-hidden="true">{band.emoji}</span><h3 className="font-extrabold text-sm mt-4">{band.label}</h3><p className="mt-1 text-xs text-muted-foreground">{band.grade}</p><ArrowRight className="mt-4 h-4 w-4" /></Link>)}</div>
      </section>
      <section className="max-w-6xl mx-auto px-5 md:px-10 pb-8"><div className="educator-banner"><span className="feature-icon"><Presentation className="h-7 w-7" /></span><div className="flex-1"><h2 className="font-display text-2xl">Teachers and schools</h2></div><Link href="/login?tab=join" className="quest-button quest-button-secondary">Open your space <ArrowRight className="h-4 w-4" /></Link></div></section>
    </main><SiteFooter /><PublicMobileNav />
  </div>;
}
