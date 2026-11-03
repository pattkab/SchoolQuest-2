"use client";

import { useActionState } from "react";
import { redeemPromoCode } from "./actions";

export default function PromoCodeForm({ preview = false }: { preview?: boolean }) {
  const [state, action, busy] = useActionState(redeemPromoCode, { error: "", message: "" });
  return (
    <section className="space-y-2 rounded-2xl border bg-background p-4" aria-labelledby="promo-title">
      <h2 id="promo-title" className="font-display text-xl">Have a promo code?</h2>
      <p className="text-sm text-muted-foreground">Redeem a code to add Premium time to your account.</p>
      <form action={preview ? undefined : action} className="flex flex-wrap items-end gap-2">
        <label className="grid gap-1 text-sm font-medium">
          Promo code
          <input name="code" required minLength={4} maxLength={64} autoComplete="off" autoCapitalize="characters" spellCheck={false}
            className="min-h-11 w-full min-w-0 rounded-xl border px-3" disabled={busy || preview} />
        </label>
        <button disabled={busy || preview} className="min-h-11 rounded-xl border px-4 font-bold disabled:opacity-60">
          {busy ? "Redeeming…" : "Redeem"}
        </button>
      </form>
      {state.error && <p role="alert" className="text-sm text-red-800">{state.error}</p>}
      {state.message && <p role="status" className="text-sm font-medium">{state.message}</p>}
    </section>
  );
}
