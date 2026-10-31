import Link from "next/link";
import { db } from "@/lib/db";
import { loginAction, registerStudentAction } from "@/app/actions/auth";
import { googleSignInAction } from "@/app/actions/google";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandMark } from "@/components/shell";
import { SiteFooter } from "@/components/site-footer";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; tab?: string }>;
}) {
  const { error, tab } = await searchParams;
  const classes = await db.classGrade.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    select: { id: true, name: true, shortName: true },
  });
  const join = tab === "join";

  return (
    <div className="min-h-screen flex flex-col">
    <div className="flex-1 grid lg:grid-cols-2">
      <div className="hidden lg:flex relative overflow-hidden bg-[var(--ink)] text-white p-12 items-end">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero-students.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" />
        <div className="relative z-10 space-y-4 max-w-lg">
          <BrandMark />
          <h1 className="font-display text-5xl">Sign in.</h1>
        </div>
      </div>

      <div className="flex flex-col justify-center px-5 py-10 md:px-16">
        <div className="lg:hidden mb-8"><BrandMark /></div>
        <form action={googleSignInAction} className="max-w-md mb-4">
          <button type="submit" className="w-full h-12 rounded-2xl border bg-white font-bold">Continue with Google</button>
        </form>
        <div className="flex gap-2 mb-6">
          <Link href="/login" className={`rounded-full px-4 py-2 text-sm font-bold ${!join ? "bg-primary text-white" : "bg-white border"}`}>Sign in</Link>
          <Link href="/login?tab=join" className={`rounded-full px-4 py-2 text-sm font-bold ${join ? "bg-primary text-white" : "bg-white border"}`}>New learner</Link>
        </div>

        {error && (
          <p className="mb-4 rounded-2xl bg-red-50 text-red-700 px-4 py-3 text-sm font-semibold">
            {error === "exists" ? "Phone already used. Sign in." : error === "google" ? "Add Google client ID and secret, then try again." : "Check phone and PIN."}
          </p>
        )}

        {!join ? (
          <form action={loginAction} className="space-y-5 max-w-md">
            <input type="hidden" name="intent" value="STUDENT" />
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" name="phone" required placeholder="0702222222" className="h-12 rounded-2xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">PIN or password</Label>
              <Input id="password" name="password" type="password" required className="h-12 rounded-2xl" />
            </div>
            <button type="submit" className="w-full h-12 rounded-2xl text-base font-bold bg-primary text-white">Enter</button>
            <p className="text-sm text-muted-foreground">
              Teacher? <Link href="/register/teacher" className="font-bold text-primary">Apply</Link>
            </p>
          </form>
        ) : (
          <form action={registerStudentAction} className="space-y-5 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="name">Learner name</Label>
              <Input id="name" name="name" required placeholder="Okello Daniel" className="h-12 rounded-2xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="classGradeId">Class</Label>
              <select id="classGradeId" name="classGradeId" className="w-full h-12 rounded-2xl border bg-white px-3">
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>{c.shortName} · {c.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone2">Phone number</Label>
              <Input id="phone2" name="phone" required className="h-12 rounded-2xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password2">Create a PIN</Label>
              <Input id="password2" name="password" type="password" required minLength={4} className="h-12 rounded-2xl" />
            </div>
            <button type="submit" className="w-full h-12 rounded-2xl text-base font-bold bg-primary text-white">Create account</button>
          </form>
        )}

        <form action={loginAction} className="mt-8 max-w-md rounded-3xl border bg-white p-5 space-y-3">
          <input type="hidden" name="intent" value="TEACHER" />
          <p className="font-display text-xl">Teacher</p>
          <Input name="phone" placeholder="0701111111" className="h-11 rounded-2xl" />
          <Input name="password" type="password" placeholder="PIN" className="h-11 rounded-2xl" />
          <button type="submit" className="w-full h-11 rounded-2xl font-bold bg-secondary text-white">Teacher sign in</button>
        </form>

        <p className="mt-6 text-xs text-muted-foreground max-w-md">
          PIN 1234 · P.7 0702222222 · Teacher 0701111111 · School 0705555555 · Admin 0700000000
        </p>
      </div>
    </div>
    <SiteFooter />
    </div>
  );
}
