"use client";

import { SUPPORT_EMAIL } from "@/lib/privacy";

const reasons = ["Too hard to use", "Missing a subject or class", "Using another app", "Finished this term", "Something else"];

export function LeaveNote() {
  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const reason = String(data.get("reason") || "Something else");
        const note = String(data.get("note") || "").trim();
        const body = encodeURIComponent(`Why I am leaving School Quest\n\n${reason}\n${note}`);
        window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Why I am leaving School Quest")}&body=${body}`;
      }}
    >
      <p className="font-bold">Tell us why you are leaving</p>
      <select name="reason" className="w-full h-12 rounded-2xl border px-3" defaultValue={reasons[0]}>
        {reasons.map((reason) => <option key={reason}>{reason}</option>)}
      </select>
      <textarea name="note" rows={3} className="w-full rounded-2xl border px-3 py-2" placeholder="Optional detail" />
      <button className="quest-button" type="submit">Email the reason</button>
    </form>
  );
}
