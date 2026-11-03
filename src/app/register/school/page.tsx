import { getSessionUser } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { registerSchoolAction } from "@/app/actions/auth";
import { BrandMark } from "@/components/shell";
import { PasswordInput } from "@/components/fields";

const errors: Record<string, string> = {
  missing: "Fill in each field and enter a Ugandan mobile number and a PIN of at least four characters.",
  exists: "That phone already has an account. Sign in with your existing details.",
  limited: "Too many attempts. Please try again later.",
};

export default async function SchoolRegistration({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await getSessionUser()) redirect("/dashboard");
  const { error } = await searchParams;
  return (
    <main className="mx-auto max-w-lg space-y-5 px-5 py-8">
      <BrandMark />
      <Link href="/login?tab=join" className="block text-sm font-bold text-primary">← Choose a different role</Link>
      <h1 className="font-display text-4xl">Set up your school</h1>
      <p className="text-muted-foreground">Create your school administrator account. You’ll get a school code to share with teachers, then you can enrol learners and track attendance and fees.</p>
      <p className="text-sm">Already have access to your school? <Link href="/login" className="font-bold text-primary">Sign in</Link>.</p>
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-red-800">{errors[error] || "Check your details and try again."}</p>}
      <form action={registerSchoolAction} className="space-y-4 rounded-3xl border bg-background p-5">
        {[
          { label: "Your full name", name: "name", autoComplete: "name" },
          { label: "School name", name: "schoolName", autoComplete: "organization" },
          { label: "District", name: "district", autoComplete: "address-level2" },
          { label: "Your phone number", name: "phone", autoComplete: "tel" },
        ].map((field) => <label key={field.name} className="block text-sm font-bold">
          {field.label}
          <input name={field.name} autoComplete={field.autoComplete} type={field.name === "phone" ? "tel" : "text"} required className="mt-1 block h-12 w-full rounded-2xl border px-3 font-normal" />
        </label>)}
        <div><label htmlFor="school-pin" className="block text-sm font-bold">Choose a PIN</label>
          <PasswordInput id="school-pin" name="password" minLength={4} required autoComplete="new-password" placeholder="At least 4 characters" className="mt-1 h-12 w-full rounded-2xl border px-3 font-normal" />
        </div>
        <button type="submit" className="quest-button w-full">Create school workspace</button>
      </form>
    </main>
  );
}
