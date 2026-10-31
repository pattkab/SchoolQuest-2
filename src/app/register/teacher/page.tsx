import Link from "next/link";
import { registerTeacherAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  return (
    <div className="min-h-screen flex flex-col">
    <div className="px-5 py-8 md:px-10 flex-1">
      <div className="max-w-3xl mx-auto">
        <BrandMark />
        <h1 className="font-display text-4xl md:text-5xl mt-8">Teacher signup</h1>
        <p className="text-muted-foreground mt-2">MoES / UTS number. Admin reviews it.</p>
        {error && (
          <p className="mt-4 rounded-2xl bg-red-50 text-red-700 px-4 py-3 text-sm font-semibold">
            {error === "reg" ? "Registration number already used." : error === "exists" ? "Phone already used." : "Fill the required fields."}
          </p>
        )}

        <form action={registerTeacherAction} className="mt-8 grid md:grid-cols-2 gap-5 bg-white border rounded-[2rem] p-6 md:p-8">
          <Field label="Full name" name="fullName" placeholder="Nakato Grace" />
          <Field label="Teacher registration number" name="registrationNumber" placeholder="UTS/2018/44821" />
          <Field label="Phone number" name="phone" placeholder="07..." />
          <Field label="Email" name="email" placeholder="optional" required={false} />
          <Field label="National ID" name="nationalId" placeholder="CM..." required={false} />
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
          <Field label="Create a PIN" name="password" type="password" />
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="bio">Short bio</Label>
            <Textarea id="bio" name="bio" placeholder="What you teach and how you mark." className="min-h-28 rounded-2xl" />
          </div>
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-3">
            <Button className="h-12 rounded-2xl px-8 font-bold">Submit</Button>
            <Link href="/login" className="h-12 rounded-2xl px-8 border grid place-items-center font-bold">I have an account</Link>
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
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} placeholder={placeholder} required={required} className="h-11 rounded-2xl" />
    </div>
  );
}
