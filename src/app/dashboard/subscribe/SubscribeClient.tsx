"use client";

import { startYoCheckout } from "./actions";

type Plan = { code: string; name: string; price: number; currency: string; periodDays: number | null; kind: string; grantsAccess: boolean; active: boolean };
type Payment = { id: string; planCode: string; amount: number; currency: string; status: string; kind: string };
type Summary = {
  premium: boolean;
  endsAt: string | null;
  source: string | null;
  policy: string;
  plans: Plan[];
  physical: Plan[];
  freeExams: { subject: string }[];
  payments: Payment[];
};

export default function SubscribeClient({ summary, pending }: { summary: Summary; pending: string }) {
  const digital = summary.plans.filter((plan) => plan.kind === "DIGITAL" && plan.grantsAccess);
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-3xl">Subscription</h1>
        <p className="mt-2 text-muted-foreground">{summary.premium ? `Premium is active${summary.endsAt ? ` until ${new Date(summary.endsAt).toLocaleDateString()}` : ""}.` : "No paid subscription is active."}</p>
        <p className="mt-2">{summary.policy}</p>
      </div>
      {pending ? <p className="rounded-2xl border bg-white p-4">Payment {pending} is waiting for the provider. This screen does not turn Premium on.</p> : null}
      <ul className="space-y-3">
        {digital.map((plan) => (
          <li key={plan.code} className="rounded-2xl border bg-white p-4">
            <p className="font-medium">{plan.name}</p>
            <p>{plan.currency} {plan.price.toLocaleString()}{plan.periodDays ? ` for ${plan.periodDays} days` : ""}</p>
            <form action={startYoCheckout} className="mt-3">
              <input type="hidden" name="planCode" value={plan.code} />
              <button className="h-11 rounded-2xl bg-primary px-4 text-white">Request mobile money</button>
            </form>
          </li>
        ))}
      </ul>
      <div>
        <h2 className="font-display text-xl">Physical products</h2>
        <p className="text-sm text-muted-foreground">Tablets, books, and shirts are separate. Paying for one does not open Premium.</p>
        <ul className="mt-2 space-y-1">
          {summary.physical.map((plan) => <li key={plan.code}>{plan.name}{plan.active ? "" : " — price not set"}</li>)}
        </ul>
      </div>
      {summary.freeExams.length ? (
        <div>
          <h2 className="font-display text-xl">Free exams already started</h2>
          <ul>{summary.freeExams.map((exam) => <li key={exam.subject}>{exam.subject}</li>)}</ul>
        </div>
      ) : null}
      {summary.payments.length ? (
        <div>
          <h2 className="font-display text-xl">Payments</h2>
          <ul>{summary.payments.map((payment) => <li key={payment.id}>{payment.kind} {payment.planCode} · {payment.currency} {payment.amount.toLocaleString()} · {payment.status}</li>)}</ul>
        </div>
      ) : null}
    </div>
  );
}
