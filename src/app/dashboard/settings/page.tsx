import Link from "next/link";
import { signOut } from "@/auth";
import { requireUser } from "@/lib/session";
import { PRIVACY_POLICY_URL } from "@/lib/privacy";
import { AppSettings } from "@/components/app-settings";
import { joinClassroomAction } from "@/app/actions/marking";
import { LogOut } from "lucide-react";

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ suggestion?: string }> }) {
  const { suggestion } = await searchParams;
  const user = await requireUser();
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="font-display">Settings</h1>
      <AppSettings sent={suggestion} />
      {(user.role === "STUDENT" || user.role === "TEACHER") && (
        <form action={joinClassroomAction} className="quest-panel flex gap-2">
          <label className="sr-only" htmlFor="class-code">Class code</label>
          <input id="class-code" name="code" placeholder="Class code" className="h-12 flex-1 rounded-2xl border px-3" />
          <button type="submit" className="rounded-2xl bg-primary px-4 font-bold text-white">Join</button>
        </form>
      )}
      <section className="quest-panel">
        <div className="settings-list">
          <Link href="/dashboard/library">Library</Link>
          <Link href="/accessibility">Accessibility help</Link>
          <a href={PRIVACY_POLICY_URL}>Privacy</a>
          <Link href="/delete-account">Delete account</Link>
        </div>
      </section>
      <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
        <button className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border bg-white text-sm font-bold"><LogOut className="h-4 w-4" /> Sign out</button>
      </form>
    </div>
  );
}
