"use client";

import { useActionState } from "react";
import { startYoCheckout } from "./actions";

export default function YoPaymentForm({ planCode, available, preview = false }: {
  planCode: string;
  available: boolean;
  preview?: boolean;
}) {
  const [state, action, busy] = useActionState(startYoCheckout, { error: "" });
  return (
    <form action={preview ? undefined : action} className="mt-4 space-y-3">
      <input type="hidden" name="planCode" value={planCode} />
      <label className="block max-w-sm space-y-1">
        <span className="block text-sm font-medium">Mobile money number</span>
        <input name="phone" type="tel" autoComplete="tel" maxLength={24} required
          placeholder="07XX XXX XXX" disabled={!available || busy}
          className="h-11 w-full rounded-xl border bg-background px-3" />
      </label>
      <p className="text-sm text-muted-foreground">Use the number registered with your wallet. Approve the prompt on your phone.</p>
      <div className="flex flex-wrap gap-2">
        <button type={preview ? "button" : "submit"} disabled={!available || busy} className="min-h-11 rounded-xl bg-amber-300 px-4 font-semibold text-slate-950 disabled:opacity-60">
          Pay with MTN MoMo
        </button>
        <button type={preview ? "button" : "submit"} disabled={!available || busy} className="min-h-11 rounded-xl bg-red-700 px-4 font-semibold text-white disabled:opacity-60">
          Pay with Airtel Money
        </button>
      </div>
      {busy && <p role="status">Requesting payment…</p>}
      {state.error && <p role="alert">{state.error}</p>}
      {!available && <p role="status">Mobile money checkout is currently unavailable.</p>}
    </form>
  );
}
