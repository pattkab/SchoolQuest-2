import Link from "next/link";
import { BrandMark } from "@/components/shell";
import { SiteFooter } from "@/components/site-footer";
import { PATHWAYS } from "@/lib/pathways";

const rooms = ["Baby–Top", "P.1–P.3", "P.4–P.6", "P.7"];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-5 md:px-10 py-5 flex items-center justify-between">
        <BrandMark />
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden sm:inline text-base font-bold hover:text-primary">Sign in</Link>
          <Link href="/login" className="rounded-full bg-primary text-white px-5 py-2.5 text-base font-bold shadow-lg hover:bg-[var(--forest)]">
            Start
          </Link>
        </div>
      </header>

      <main className="page-rise px-5 md:px-10 pb-10 flex-1">
        <section className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center pt-6">
          <div className="space-y-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">School Quest</p>
            <h1 className="font-display display-hero text-[var(--ink)]">
              Baby Class to P.7.
            </h1>
            <p className="text-xl text-muted-foreground max-w-md">Read. Practice. Get marked.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/login" className="rounded-full bg-primary text-white px-7 py-3.5 text-lg font-bold text-center shadow-xl hover:bg-[var(--forest)]">
                Enter
              </Link>
              <Link href="/register/teacher" className="rounded-full bg-white border px-7 py-3.5 text-lg font-bold text-center hover:border-primary">
                Teach
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2.2rem] min-h-[320px] shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero-students.png" alt="" className="hero-photo absolute inset-0 h-full w-full object-cover" />
          </div>
        </section>

        <section className="stagger max-w-6xl mx-auto mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PATHWAYS.map((pathway) => (
            <Link key={pathway.id} href={`/login?pathway=${pathway.id}`} className="lift rounded-3xl border p-5">
              <p className="font-display text-3xl">{pathway.label}</p>
              <p className="text-base text-muted-foreground mt-2">{pathway.line}</p>
            </Link>
          ))}
        </section>

        <section className="stagger max-w-6xl mx-auto mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {rooms.map((title) => (
            <Link key={title} href="/login?pathway=student" className="room-card rounded-3xl p-5 border">
              <p className="font-display text-3xl">{title}</p>
            </Link>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
