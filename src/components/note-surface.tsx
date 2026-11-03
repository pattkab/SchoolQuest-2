"use client";

import { useState } from "react";
import { suggestFeature } from "@/app/actions/feedback";

export function NoteSurface({ canEdit, returnTo, children }: { canEdit: boolean; returnTo: string; children: React.ReactNode }) {
  const [editing, setEditing] = useState(false);
  return (
    <div onDoubleClick={() => canEdit && setEditing(true)}>
      {children}
      {editing && (
        <form action={suggestFeature} className="quest-panel mt-4 space-y-2">
          <input type="hidden" name="category" value="CONTENT_ISSUE" />
          <input type="hidden" name="returnTo" value={returnTo} />
          <label className="text-sm font-bold" htmlFor="correction">Suggest a correction</label>
          <textarea id="correction" name="message" required minLength={4} rows={3} className="w-full rounded-2xl border px-3 py-2" placeholder="What should change in this lesson?" />
          <button className="quest-button quest-button-small" type="submit">Send</button>
        </form>
      )}
    </div>
  );
}
