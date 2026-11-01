"use client";

import Link from "next/link";

export default function SubscribeClient({ userPhone }: { userPhone: string }) {
  void userPhone;
  return (
    <main className="mx-auto max-w-xl space-y-5 rounded-3xl border bg-white p-6 sm:p-9">
      <p className="text-sm font-bold text-primary">SchoolQuest Pro</p>
      <h1 className="font-display text-4xl">Keep practising</h1>
      <p className="text-muted-foreground">One practice exam in every subject is free. Upgrade for more practice and mock exams.</p>
      <div className="rounded-2xl border bg-muted p-5 space-y-2">
        <p className="font-bold">Student Pro · UGX 25,000/year</p>
        <p className="text-sm">Extra practice exams, mock tests and progress tools.</p>
      </div>
      <div role="status" className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        Secure subscription checkout is being connected. Payments are not being collected on this screen yet. Your free practice remains available in unused subjects.
      </div>
      <Link href="/dashboard" className="inline-block rounded-2xl bg-primary px-5 py-3 font-bold text-white">Back to learning</Link>
    </main>
  );
}
