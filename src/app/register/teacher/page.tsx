import { getSessionUser } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { registerTeacherAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { ClearableInput, PasswordInput } from "@/components/fields";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BrandMark } from "@/components/shell";
import { SiteFooter } from "@/components/site-footer";

export default async function TeacherRegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const user = await getSessionUser();
  if (user && (user.role !== "TEACHER" || user.teacherProfile)) redirect("/dashboard");
  return (
    <div className="min-h-screen flex flex-col">
    <div className="px-5 py-8 md:px-10 flex-1">
      <div className="max-w-3xl mx-auto">
        <BrandMark />
        <Link href={user ? "/dashboard/teacher" : "/login?tab=join"} className="mt-5 block text-sm font-bold text-primary">← {user ? "Back to teaching dashboard" : "Choose a different role"}</Link>
        <h1 className="font-display text-4xl md:text-5xl mt-4">Apply for teacher accreditation</h1>
        <p className="text-muted-foreground mt-2">Have your MoES or UTS registration number ready. A site manager will review your application. You can check its status from your teaching dashboard.</p>
        {error && (
          <p role="alert" className="mt-4 rounded-2xl bg-red-50 text-red-700 px-4 py-3 text-sm font-semibold">
            {error === "reg" ? "Registration number already used." : error === "exists" ? "This phone already has an account. Sign in to continue." : error === "limited" ? "Too many attempts. Try again later." : "Fill in the required fields and choose a PIN of at least four characters if you’re creating an account."}
          </p>
        )}

        <form action={registerTeacherAction} className="mt-8 grid md:grid-cols-2 gap-5 bg-white border rounded-[2rem] p-6 md:p-8">
          <Field label="Full name" name="fullName" placeholder="Nakato Grace" value={user?.name ?? undefined} />
          <Field label="Teacher registration number" name="registrationNumber" placeholder="UTS/2018/44821" />
          {!user && <Field label="Sign-in phone number" name="phone" type="tel" placeholder="07..." />}
          {!user && <Field label="Email (optional)" name="email" type="email" required={false} />}
          <Field label="School" name="school" placeholder="St. Mary's Namagunga" />
          <Field label="District" name="district" placeholder="Mukono" />
          <div className="space-y-2">
            <Label htmlFor="qualification">Highest qualification</Label>
            <select id="qualification" name="qualification" required className="w-full h-11 rounded-2xl border bg-white px-3">
              <option>Grade III</option>
              <option>Grade V</option>
              <option>Diploma in Education</option>
              <option>Bachelor of Education (Primary)</option>
              <option>Bachelor of Education (Secondary)</option>
              <option>Master&apos;s</option>
              <option>Other</option>
            </select>
          </div>
          <Field label="Years of experience" name="yearsExperience" placeholder="9" required={false} />
          <Field label="Subjects you mark" name="subjects" placeholder="Mathematics, Science" required={false} />
          <Field label="Classes" name="classes" placeholder="p6, p7" required={false} />
          {!user && <Field label="Create a PIN" name="password" type="password" />}
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="bio">Short bio</Label>
            <Textarea id="bio" name="bio" placeholder="What you teach and how you mark." className="min-h-28 rounded-2xl" />
          </div>
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-3">
            <Button className="h-12 rounded-2xl px-8 font-bold">Submit application</Button>
            {!user && <Link href="/login" className="h-12 rounded-2xl px-8 border grid place-items-center font-bold">I have an account</Link>}
          </div>
        </form>
      </div>
    </div>
    <SiteFooter />
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = true,
  value,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  value?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      {type === "password" ? <PasswordInput id={name} name={name} placeholder={placeholder} required={required} autoComplete="new-password" minLength={4} className="h-11 w-full rounded-2xl border px-3" /> : <ClearableInput id={name} name={name} type={type} defaultValue={value} placeholder={placeholder} required={required} className="h-11 w-full rounded-2xl border px-3" />}
    </div>
  );
}
