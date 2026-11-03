"use client";

import { completeProfileAction } from "@/app/actions/school";
import { DoorFace } from "@/components/quest-door";

export function ClassDoors({
  name,
  phone,
  classes,
}: {
  name: string;
  phone: string;
  classes: { id: string; shortName: string }[];
}) {
  return (
    <form action={completeProfileAction} className="space-y-4">
      {!name && (
        <label className="block text-sm font-bold">
          Your name
          <input name="name" required placeholder="What should we call you?" className="mt-1 h-12 w-full rounded-2xl border px-3 font-normal" />
        </label>
      )}
      {name ? <input type="hidden" name="name" value={name} /> : null}
      <input type="hidden" name="phone" value={phone} />
      <input type="hidden" name="role" value="STUDENT" />
      <div className="quest-doors">
        {classes.map((cls, index) => (
          <button key={cls.id} type="submit" name="classGradeId" value={cls.id} className={`quest-door tone-${index % 4}`}>
            <DoorFace label={cls.shortName.replace(/\./g, "")} />
          </button>
        ))}
      </div>
    </form>
  );
}
