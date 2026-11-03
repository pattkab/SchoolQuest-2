"use client";

import { useFormStatus } from "react-dom";
import { completeProfileAction } from "@/app/actions/school";

export function ProfileForm({
  editing,
  needsSchool,
  needsSchoolCode,
  defaults,
  classes,
}: {
  editing: boolean;
  needsSchool: boolean;
  needsSchoolCode: boolean;
  defaults: { name: string; phone: string; role: string; classGradeId: string };
  classes: { id: string; shortName: string }[];
}) {

  return (
    <form action={completeProfileAction} className="space-y-4">
      <label className="block text-sm font-bold">
        Name
        <input name="name" required defaultValue={defaults.name} className="mt-1 w-full h-12 rounded-2xl border px-3 font-normal" />
      </label>
      {defaults.role === "STUDENT" && (
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
      {needsSchoolCode && (
        <label className="block text-sm font-bold">
          School code (optional)
          <input name="schoolCode" placeholder="Ask your school administrator" className="mt-1 w-full h-12 rounded-2xl border px-3 font-normal" />
        </label>
      )}
      {needsSchool && (
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
        Phone (optional)
        <input type="tel" autoComplete="tel" name="phone" defaultValue={defaults.phone} placeholder="07..." className="mt-1 w-full h-12 rounded-2xl border px-3 font-normal" />
      </label>
      <SaveProfile editing={editing} />
    </form>
  );
}


function SaveProfile({ editing }: { editing: boolean }) {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} className="h-12 w-full rounded-2xl bg-primary text-white font-bold disabled:opacity-60">
    {pending ? "Saving…" : editing ? "Save changes" : "Save and open dashboard"}
  </button>;
}
