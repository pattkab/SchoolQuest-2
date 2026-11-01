"use client";

import { registerStudentAction } from "@/app/actions/auth";
import { SchoolField } from "@/components/school-field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function JoinForm({ classes }: { classes: { id: string; name: string; shortName: string }[] }) {
  return (
    <form action={registerStudentAction} className="space-y-5 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="name">Learner name</Label>
        <Input id="name" name="name" required placeholder="Okello Daniel" className="h-12 rounded-2xl" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="sex">Sex</Label>
          <select id="sex" name="sex" required className="w-full h-12 rounded-2xl border bg-white px-3">
            <option value="">Choose</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of birth</Label>
          <Input id="dateOfBirth" name="dateOfBirth" type="date" required className="h-12 rounded-2xl" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="classGradeId">Class</Label>
        <select id="classGradeId" name="classGradeId" required className="w-full h-12 rounded-2xl border bg-white px-3">
          <option value="">Choose</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>{cls.shortName} · {cls.name}</option>
          ))}
        </select>
      </div>
      <SchoolField />
      <p className="text-xs text-muted-foreground">Schools from the Ministry of Education EMIS register.</p>
      <div className="space-y-2">
        <Label htmlFor="guardianName">Guardian</Label>
        <Input id="guardianName" name="guardianName" required placeholder="Parent or guardian" className="h-12 rounded-2xl" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="guardianPhone">Guardian phone</Label>
        <Input id="guardianPhone" name="guardianPhone" required inputMode="tel" placeholder="07..." className="h-12 rounded-2xl" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone2">Learner phone</Label>
        <Input id="phone2" name="phone" required inputMode="tel" className="h-12 rounded-2xl" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password2">Create a PIN</Label>
        <Input id="password2" name="password" type="password" required minLength={4} className="h-12 rounded-2xl" />
      </div>
      <button type="submit" className="w-full h-12 rounded-2xl text-base font-bold bg-primary text-white">Create account</button>
    </form>
  );
}
