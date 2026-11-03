import { db } from "@/lib/db";
import { reportOps } from "@/lib/ops-log";

export async function GET() {
  try {
    await db.$queryRaw`SELECT 1`;
    return Response.json({ ok: true, service: "schoolquest" });
  } catch {
    reportOps("health.database_failed");
    return Response.json({ ok: false, service: "schoolquest" }, { status: 503 });
  }
}
