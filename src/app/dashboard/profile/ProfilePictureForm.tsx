"use client";

import { useActionState } from "react";
import { avatars } from "@/components/avatar-options";
import { saveProfilePicture } from "./actions";

export function ProfilePictureForm({ hasGooglePhoto, current }: { hasGooglePhoto: boolean; current: string }) {
  const [state, action, pending] = useActionState(saveProfilePicture, { error: "", message: "" });
  return (
    <section className="quest-panel space-y-4" aria-labelledby="picture-title">
      <h2 id="picture-title" className="font-display text-lg">Profile picture</h2>
      <form action={action} className="space-y-3">
        <input type="hidden" name="picture" value="upload" />
        <label className="block font-bold" htmlFor="profile-photo-file">Upload a photo</label>
        <p className="text-sm text-muted-foreground" id="profile-photo-help">JPEG, PNG or WebP, up to 5 MB.</p>
        <input id="profile-photo-file" name="photo" type="file" accept="image/jpeg,image/png,image/webp" aria-describedby="profile-photo-help" required disabled={pending} className="block max-w-full text-sm" />
        <button disabled={pending} className="quest-button">Upload photo</button>
      </form>
      <form action={action}>
        <fieldset disabled={pending}>
          <legend className="mb-2 font-bold">Or choose an avatar</legend>
          <div className="flex flex-wrap gap-2">
            {avatars.map(({ id, label, icon }) => <button key={id} name="picture" value={id} type="submit" aria-pressed={current === id} className="min-h-11 rounded-xl border px-3 py-2 text-sm font-bold aria-pressed:border-primary aria-pressed:bg-primary/10">
              <span aria-hidden="true" className="mr-1 text-xl">{icon}</span>{label}
            </button>)}
            <button name="picture" value="initials" aria-pressed={current === "initials"} className="min-h-11 rounded-xl border px-3 py-2 text-sm font-bold aria-pressed:border-primary aria-pressed:bg-primary/10">Use initials</button>
            {hasGooglePhoto && <button name="picture" value="google" aria-pressed={current === "google"} className="min-h-11 rounded-xl border px-3 py-2 text-sm font-bold aria-pressed:border-primary aria-pressed:bg-primary/10">Use Google photo</button>}
          </div>
        </fieldset>
      </form>
      {pending && <p role="status">Saving your picture…</p>}
      {state.message && <p role="status">{state.message}</p>}
      {state.error && <p role="alert" className="text-red-800">{state.error}</p>}
    </section>
  );
}
