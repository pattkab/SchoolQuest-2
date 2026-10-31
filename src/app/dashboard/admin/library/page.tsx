import { db } from "@/lib/db";
import { requireUser, isAdmin } from "@/lib/session";
import { redirect } from "next/navigation";
import { syncLibraryAction } from "@/app/actions/marking";
import { Button } from "@/components/ui/button";
import { FRESH_TEACHER_FEEDS } from "@/lib/fresh-teacher";

export default async function AdminLibraryPage() {
  const user = await requireUser();
  if (!isAdmin(user.role)) redirect("/dashboard");

  const [notes, papers, resources, logs] = await Promise.all([
    db.note.count(),
    db.paper.count(),
    db.externalResource.count(),
    db.syncLog.findMany({ orderBy: { createdAt: "desc" }, take: 12 }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl">Content sync</h1>
        <p className="text-muted-foreground">
          {notes} local notes · {papers} practice papers · {resources} Fresh Teacher listings · {FRESH_TEACHER_FEEDS.length} known feeds
        </p>
      </div>
      <form action={syncLibraryAction} className="rounded-[1.6rem] bg-white border p-5 flex flex-wrap gap-3 items-end">
        <div>
          <label className="text-xs font-bold">Class key</label>
          <select name="classKey" className="block h-11 rounded-2xl border px-3 min-w-52">
            <option value="PrimarySeven">Primary Seven</option>
            <option value="PrimaryFour">Primary Four</option>
            <option value="PrimaryOne">Primary One</option>
            <option value="BabyClass">Baby Class</option>
            <option value="TopClass">Top Class</option>
          </select>
        </div>
        <Button className="rounded-2xl h-11">Refresh catalogue</Button>
      </form>
      <div className="space-y-2">
        {logs.map((log) => (
          <div key={log.id} className="rounded-2xl bg-white border px-4 py-3 text-sm">
            <span className="font-bold">{log.feed}</span> · {log.status} · {log.itemCount} items · {log.newCount} new
            {log.message ? ` · ${log.message}` : ""}
          </div>
        ))}
      </div>
    </div>
  );
}
