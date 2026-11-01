import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/session";
import { loadFellowshipEvidence } from "@/lib/fellowship-evidence";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  const user = await db.user.findUnique({ where: { id: session.user.id }, select: { role: true } });
  if (!user || !isAdmin(user.role)) return NextResponse.json({ error: "Site administrators only." }, { status: 403 });

  const report = await loadFellowshipEvidence();
  const lines = [
    ["field", "value"],
    ["updated", report.updated],
    ["real_accounts", String(report.realUsers)],
    ["demonstration_accounts_excluded", String(report.demoExcluded)],
    ["active_learners_30_days", report.activeLearners ? String(report.activeLearners) : "Not yet measured"],
    ["verified_receipts", String(report.receipts.receipts)],
    ["paying_accounts", String(report.receipts.customers)],
    ["verified_gross_ugx", report.receipts.measured ? String(report.receipts.grossUgx) : "Not yet measured"],
    ["paired_assessments", report.summary ? String(report.summary.pairs) : "Not yet measured"],
    ["mean_baseline_percent", report.summary ? String(report.summary.baselinePct) : "Not yet measured"],
    ["mean_endline_percent", report.summary ? String(report.summary.endlinePct) : "Not yet measured"],
    ["mean_change_percentage_points", report.summary ? String(report.summary.changePoints) : "Not yet measured"],
    ["limitations", report.limitations.join(" ")],
  ];
  const csv = lines.map((line) => line.map(csvCell).join(",")).join("\n");
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=schoolquest-fellowship-evidence.csv",
    },
  });
}

function csvCell(value: string) {
  return `"${value.replaceAll("\"", "\"\"")}"`;
}
