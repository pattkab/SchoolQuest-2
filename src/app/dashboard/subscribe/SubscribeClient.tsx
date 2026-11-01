"use client";

import { useState } from "react";
import Link from "next/link";
import { checkStudentProPayment, startStudentProPayment } from "./actions";

export default function SubscribeClient({ userPhone, checkoutAvailable }: { userPhone: string; checkoutAvailable: boolean }) {
  const [phone, setPhone] = useState(userPhone);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [state, setState] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function start(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setMessage("");
    try {
      const outcome = await startStudentProPayment(phone);
      setPaymentId(outcome.id); setState(outcome.status); setMessage(outcome.message);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Cannot start payment."); }
    finally { setBusy(false); }
  }
  async function check() {
    if (!paymentId) return;
    setBusy(true);
    try {
      const outcome = await checkStudentProPayment(paymentId);
      setState(outcome.status); setMessage(outcome.message);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Cannot verify payment."); }
    finally { setBusy(false); }
  }
  return <main className="mx-auto max-w-xl space-y-5 rounded-3xl border bg-white p-6 sm:p-9">
    <p className="text-sm font-bold text-primary">SchoolQuest Pro</p>
    <h1 className="font-display text-4xl">Keep practising</h1>
    <p className="text-muted-foreground">One completed practice exam per subject is free. Unlock more practice with Pro.</p>
    <div className="rounded-2xl border bg-muted p-5 space-y-2">
      <p className="font-bold">Student Pro · UGX 25,000/year</p>
      <p className="text-sm">Additional practice exams, mock tests and progress tools.</p>
    </div>
    {!checkoutAvailable ? <p role="status" className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm">Secure checkout is not configured on this environment. No payments are being collected.</p> :
      <form onSubmit={start} className="space-y-3">
        <label className="block text-sm font-bold" htmlFor="momo">Mobile Money number</label>
        <input id="momo" type="tel" autoComplete="tel" required value={phone} onChange={e => setPhone(e.target.value)} className="h-12 w-full rounded-xl border px-3"/>
        <button disabled={busy || state === "PENDING" || state === "SUCCEEDED"} className="h-12 w-full rounded-xl bg-primary px-4 font-bold text-white disabled:opacity-50">Pay UGX 25,000</button>
        {paymentId && state !== "SUCCEEDED" && <button type="button" onClick={check} disabled={busy} className="h-12 w-full rounded-xl border px-4 font-bold">Check payment status</button>}
      </form>}
    {message && <p role="status" className="rounded-xl bg-muted p-3 text-sm">{message}</p>}
    {state === "SUCCEEDED" && <Link href="/dashboard" className="inline-block rounded-xl bg-primary px-5 py-3 font-bold text-white">Continue with Pro</Link>}
    <Link href="/dashboard" className="block text-sm text-primary">Back to learning</Link>
  </main>;
}
