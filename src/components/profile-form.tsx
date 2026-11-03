"use client";

import { useState } from "react";
import { completeProfileAction } from "@/app/actions/school";

export function ProfileForm({
  locked,
  defaults,
  classes,
}: {
  locked: boolean;
  defaults: { name: string; phone: string; role: string; classGradeId: string };
  classes: { id: string; shortName: string }[];
}) {
  const [role, setRole] = useState(locked ? defaults.role : "STUDENT");
  return (
    <form action={completeProfileAction} className="space-y-4">
      <label className="block text-sm font-bold">
        Name
        <input name="name" required defaultValue={defaults.name} className="mt-1 w-full h-12 rounded-2xl border px-3 font-normal" />
      </label>
      {!locked && (
        <label className="block text-sm font-bold">
          I am
          <select name="role" value={role} onChange={(event) => setRole(event.target.value)} className="mt-1 w-full h-12 rounded-2xl border px-3 font-normal">
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
            <option value="SCHOOL_ADMIN">School manager</option>
          </select>
        </label>
      )}
      {role === "STUDENT" && (
        <>
          <label className="block text-sm font-bold">
            Class
            <select name="classGradeId" defaultValue={defaults.classGradeId} className="mt-1 w-full h-12 rounded-2xl border px-3 font-normal" required>
              <option value="">Choose</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>{cls.shortName}</option>
              ))}
            </select>
          </label>
        </>
      )}
      {role === "TEACHER" && !locked && (
        <label className="block text-sm font-bold">
          School code
          <input name="schoolCode" placeholder="SQ-DEMO" className="mt-1 w-full h-12 rounded-2xl border px-3 font-normal" />
        </label>
      )}
      {role === "SCHOOL_ADMIN" && !locked && (
        <>
          <label className="block text-sm font-bold">
            School name
            <input name="schoolName" required className="mt-1 w-full h-12 rounded-2xl border px-3 font-normal" />
          </label>
          <label className="block text-sm font-bold">
            District
            <input name="district" className="mt-1 w-full h-12 rounded-2xl border px-3 font-normal" />
          </label>
        </>
      )}
      <label className="block text-sm font-bold">
        Phone
        <input name="phone" defaultValue={defaults.phone} placeholder="07..." className="mt-1 w-full h-12 rounded-2xl border px-3 font-normal" />
      </label>
      <button type="submit" className="h-12 w-full rounded-2xl bg-primary text-white font-bold">Save</button>
    </form>
  );
}
