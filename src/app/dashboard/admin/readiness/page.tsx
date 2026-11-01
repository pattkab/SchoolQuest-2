import Link from "next/link";
import { redirect } from "next/navigation";
import { approveContentAction } from "@/app/dashboard/admin/engine/actions";
import { loadFellowshipEvidence } from "@/lib/fellowship-evidence";
import { requireUser, isAdmin } from "@/lib/session";

export default async function FundingReadinessPage() {
  const user = await requireUser();
  if (!isAdmin(user.role)) redirect("/dashboard");
  const report = await loadFellowshipEvidence();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Site administrator</p>
          <h1 className="font-display">Impact and funding</h1>
          <p className="text-base text-muted-foreground mt-1">Internal readiness only. Updated {report.updated}.</p>
        </div>
        <a href="/api/admin/fellowship-evidence" className="rounded-full bg-primary text-white px-5 py-2.5 font-bold">
          Export evidence
        </a>
      </div>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Fact label="Real accounts" value={String(report.realUsers)} note={`${report.demoExcluded} demonstration accounts excluded`} />
        <Fact label="Active learners, 30 days" value={report.activeLearners ? String(report.activeLearners) : "Not yet measured"} note="Finished a real activity" />
        <Fact label="Verified receipts" value={report.receipts.measured ? `UGX ${report.receipts.grossUgx.toLocaleString()}` : "Not yet measured"} note={report.receipts.measured ? `${report.receipts.customers} paying accounts` : "No provider is connected"} />
        <Fact label="Score change" value={report.summary ? `${report.summary.changePoints} points` : "Not yet measured"} note={report.summary ? `${report.summary.baselinePct}% to ${report.summary.endlinePct}%` : "Needs a baseline and a later endline"} />
      </section>

      <section className="space-y-3">
        {report.rows.map((row) => (
          <article key={row.domain} className="rounded-3xl border bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-2xl">{row.domain}</h2>
              <p className="rounded-full border px-3 py-1 text-sm font-bold">{row.status}</p>
            </div>
            <p className="mt-3">{row.evidence}</p>
            <p className="text-muted-foreground mt-1">Missing: {row.missing}</p>
            <p className="text-sm mt-3">Next: {row.next}</p>
            <p className="text-sm text-muted-foreground mt-1">Owner: {row.owner} · Updated {row.updated}. {row.reference}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border bg-white p-5 space-y-3">
        <h2 className="font-display text-2xl">Waiting for review</h2>
        {report.drafts.length === 0 && <p>No new extracts are waiting.</p>}
        {report.drafts.map((draft) => (
          <form key={`${draft.kind}-${draft.id}`} action={approveContentAction} className="flex flex-wrap items-center justify-between gap-3 border-t pt-3">
            <input type="hidden" name="kind" value={draft.kind} />
            <input type="hidden" name="id" value={draft.id} />
            <p className="font-semibold">{draft.title}</p>
            <button className="rounded-full border px-4 py-2 font-bold">Approve</button>
          </form>
        ))}
        <p className="text-sm text-muted-foreground">Approval publishes the item to learners. It does not confirm a licence or an official curriculum mark.</p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-2xl">Limits of this report</h2>
        {report.limitations.map((line) => <p key={line}>{line}</p>)}
        <Link href="/dashboard/admin/analytics" className="inline-block font-bold text-primary">User curves</Link>
      </section>
    </div>
  );
}

function Fact({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-3xl border bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-display text-3xl mt-1">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{note}</p>
    </div>
  );
}
