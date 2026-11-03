"use client";

import { useActionState } from "react";
import { checkYoCheckout } from "./actions";
import PromoCodeForm from "./PromoCodeForm";
import YoPaymentForm from "./YoPaymentForm";

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

function CheckPayment({ payment }: { payment: Payment }) {
  const [state, action, busy] = useActionState(checkYoCheckout, { error: "" });
  return (
    <form action={action} className="mt-2">
      <input type="hidden" name="paymentId" value={payment.id} />
      <button disabled={busy} className="min-h-11 rounded-xl border px-4">{busy ? "Checking…" : "Check payment status"}</button>
      {state.error && <p role="alert">{state.error}</p>}
    </form>
  );
}

export default function SubscribeClient({ summary, pending, available }: { summary: Summary; pending: string; available: boolean }) {
  const selected = summary.payments.find((payment) => payment.id === pending);
  const digital = summary.plans.filter((plan) => plan.kind === "DIGITAL" && plan.grantsAccess);
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-3xl">Subscription</h1>
        <p className="mt-2 text-muted-foreground">{summary.premium ? `Premium is active${summary.endsAt ? ` until ${new Date(summary.endsAt).toLocaleDateString()}` : ""}.` : "Premium is inactive."}</p>
        <p className="mt-2">{summary.policy}</p>
      </div>
      {selected && <p role="status" className="rounded-2xl border bg-white p-4">{
        selected.status === "VERIFIED" ? "Payment confirmed."
          : selected.status === "FAILED" ? "Payment failed. Check your wallet number and try again."
            : "Waiting for Yo to confirm. If you received a phone prompt, approve it and check payment status below."
      }</p>}
      <ul className="space-y-3">
        {digital.map((plan) => (
          <li key={plan.code} className="rounded-2xl border bg-white p-4">
            <p className="font-medium">{plan.name}</p>
            <p>{plan.currency} {plan.price.toLocaleString()}{plan.periodDays ? ` for ${plan.periodDays} days` : ""}</p>
            <YoPaymentForm planCode={plan.code} available={available} />
          </li>
        ))}
      </ul>
      <PromoCodeForm />
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
          <ul>{summary.payments.map((payment) => <li key={payment.id}>{payment.kind} {payment.planCode} · {payment.currency} {payment.amount.toLocaleString()} · {payment.status}{available && payment.status === "PENDING" && <CheckPayment payment={payment} />}</li>)}</ul>
        </div>
      ) : null}
    </div>
  );
}
