import Link from "next/link";
import { db } from "@/lib/db";
import { JoinForm } from "@/components/join-form";
import { GoogleSignInButton } from "@/components/google-sign-in";
import { BrandMark } from "@/components/shell";
import { SiteFooter } from "@/components/site-footer";
import { SignInForm } from "@/components/sign-in-form";
import { PublicMobileNav } from "@/components/public-mobile-nav";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; tab?: string; pathway?: string }>;
}) {
  const { error, tab, pathway } = await searchParams;
  const classes = await db.classGrade.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    select: { id: true, name: true, shortName: true },
  });
  const people = await db.user.findMany({
    where: { phone: { not: null } },
    select: { id: true, name: true, phone: true, role: true, classGrade: { select: { shortName: true, order: true } } },
  });
  const profiles = people
    .filter((person): person is typeof person & { phone: string } => Boolean(person.phone))
    .sort((a, b) => (a.classGrade?.order ?? 99) - (b.classGrade?.order ?? 99) || (a.name || "").localeCompare(b.name || ""))
    .map((person) => ({
      id: person.id,
      name: person.name || person.phone,
      phone: person.phone,
      role: person.role,
      className: person.classGrade?.shortName ?? null,
    }));
  const join = tab === "join";

  return (
    <div className="mobile-navigation-page mobile-app-frame min-h-screen flex flex-col">
    <header className="mobile-app-bar lg:hidden px-5 flex items-center"><BrandMark /></header>
    <div className="flex-1 grid lg:grid-cols-2">
      <div className="hidden lg:flex relative overflow-hidden bg-[var(--ink)] text-white p-12 items-end">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero-students.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" />
        <div className="relative z-10 space-y-4 max-w-lg">
          <BrandMark />
          <h1 className="font-display text-5xl">Choose a pathway.</h1>
        </div>
      </div>

      <div className="flex flex-col justify-center px-5 py-10 md:px-16">
        <GoogleSignInButton />
        <div className="flex gap-2 mb-6">
          <Link href="/login" className={`rounded-full px-4 py-2 text-sm font-bold ${!join ? "bg-primary text-white" : "bg-white border"}`}>Sign in</Link>
          <Link href="/login?tab=join" className={`rounded-full px-4 py-2 text-sm font-bold ${join ? "bg-primary text-white" : "bg-white border"}`}>New learner</Link>
        </div>

        {error && (
          <p className="mb-4 rounded-2xl bg-red-50 text-red-700 px-4 py-3 text-sm font-semibold">
            {error === "exists" ? "Phone already used. Sign in." : error === "google" ? "Google sign-in did not finish. Try again." : error === "school" ? "Choose a school from the list." : error === "missing" ? "Fill every required field." : "Check phone and PIN."}
          </p>
        )}

        {!join ? (
          <SignInForm profiles={profiles} pathway={pathway} />
        ) : (
          <JoinForm classes={classes} />
        )}

      </div>
    </div>
    <SiteFooter />
    <PublicMobileNav />
    </div>
  );
}
