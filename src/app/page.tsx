import Link from "next/link";
import { BookOpenCheck, PenLine, Users } from "lucide-react";
import { BrandMark } from "@/components/shell";
import { SiteFooter } from "@/components/site-footer";

const rooms = ["Baby–Top", "P.1–P.3", "P.4–P.6", "P.7"];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-5 md:px-10 py-5 flex items-center justify-between">
        <BrandMark />
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden sm:inline text-sm font-bold">Sign in</Link>
          <Link href="/login" className="rounded-full bg-primary text-white px-5 py-2.5 text-sm font-bold shadow-lg">
            Start
          </Link>
        </div>
      </header>

      <main className="px-5 md:px-10 pb-10 flex-1">
        <section className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center pt-6">
          <div className="space-y-6">
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--ink)]">
              Baby Class to P.7.
            </h1>
            <p className="text-lg text-muted-foreground">Read. Practice. Get marked.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/login" className="rounded-full bg-primary text-white px-7 py-3.5 text-base font-bold text-center shadow-xl">
                Enter
              </Link>
              <Link href="/register/teacher" className="rounded-full bg-white border px-7 py-3.5 text-base font-bold text-center">
                Teach
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2.2rem] min-h-[280px] shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero-students.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </section>

        <section className="max-w-6xl mx-auto mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {rooms.map((title) => (
            <Link key={title} href="/login" className="room-card rounded-3xl p-5 border">
              <p className="font-display text-2xl">{title}</p>
            </Link>
          ))}
        </section>

        <section className="max-w-6xl mx-auto mt-8 grid md:grid-cols-3 gap-3">
          {[
            [BookOpenCheck, "Read"],
            [PenLine, "Practice"],
            [Users, "Teacher marks"],
          ].map(([Icon, title]) => (
            <div key={String(title)} className="rounded-3xl bg-white border p-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary grid place-items-center">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl">{title as string}</h3>
            </div>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
