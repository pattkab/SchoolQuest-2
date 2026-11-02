import { storeNoticeDecision } from "@/lib/billing";
import { reportOps } from "@/lib/ops-log";
import { rateLimit, requestRateKey } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!rateLimit(requestRateKey(request, "billing-apple"), 30, 60_000).ok) {
    return Response.json({ error: "Too many requests." }, { status: 429 });
  }
  const body = await request.json().catch(() => null) as { notificationType?: string } | null;
  const notice = String(body?.notificationType || "");
  if (storeNoticeDecision(notice, false) === "deny") {
    reportOps("billing.apple_unverified", { notice: notice || "purchase" });
    return Response.json({ error: "The store has not confirmed this notice." }, { status: 403 });
  }
  return Response.json({ error: "The store has not confirmed this notice." }, { status: 403 });
}
