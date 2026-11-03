"use client";

import { registerStudentAction } from "@/app/actions/auth";
import { ClearableInput, PasswordInput } from "@/components/fields";
import { Label } from "@/components/ui/label";

export function JoinForm({ classes }: { classes: { id: string; name: string; shortName: string }[] }) {
  return (
    <form action={registerStudentAction} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Your name</Label>
        <ClearableInput id="name" name="name" required placeholder="Okello Daniel" className="h-12 w-full rounded-2xl border px-3" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="classGradeId">Class</Label>
        <select id="classGradeId" name="classGradeId" required className="w-full h-12 rounded-2xl border bg-white px-3">
          <option value="">Choose</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>{cls.shortName}</option>
          ))}
        </select>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="phone2">Phone number</Label>
        <ClearableInput id="phone2" name="phone" required inputMode="tel" autoComplete="tel" placeholder="0700 123 456" className="h-12 w-full rounded-2xl border px-3" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password2">Choose a PIN</Label>
        <PasswordInput id="password2" name="password" required minLength={4} autoComplete="new-password" placeholder="At least 4 numbers" className="h-12 w-full rounded-2xl border px-3" />
      </div>
      <button type="submit" className="w-full h-12 rounded-2xl text-base font-bold bg-primary text-white">Create account</button>
      <p className="text-center text-xs text-muted-foreground">School and guardian details can wait until later.</p>
    </form>
  );
}
