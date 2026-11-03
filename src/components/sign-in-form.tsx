"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, LoaderCircle, LockKeyhole, Phone, X } from "lucide-react";
import { loginAction } from "@/app/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} className="quest-button w-full" aria-busy={pending}>
    {pending ? <><LoaderCircle className="h-5 w-5 animate-spin" /> Signing you in…</> : <>Sign in <ArrowRight className="h-5 w-5" /></>}
  </button>;
}

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  return <form action={loginAction} className="space-y-4">
    <div className="space-y-1.5">
      <label htmlFor="phone" className="text-sm font-bold">Phone number</label>
      <div className="quest-input-wrap"><Phone className="h-4 w-4" aria-hidden="true" /><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="0700 123 456" value={phone} onChange={(event) => setPhone(event.target.value)} onDoubleClick={(event) => event.currentTarget.select()} />{phone && <button type="button" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" aria-label="Clear phone number" onClick={() => setPhone("")}><X className="h-4 w-4" /></button>}</div>
    </div>
    <div className="space-y-1.5">
      <label htmlFor="password" className="text-sm font-bold">PIN</label>
      <div className="quest-input-wrap"><LockKeyhole className="h-4 w-4" aria-hidden="true" /><input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required placeholder="Your PIN" />
        <button type="button" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl hover:bg-muted" aria-label={showPassword ? "Hide PIN" : "Show PIN"} aria-pressed={showPassword} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
      </div>
    </div>
    <SubmitButton />
    <p className="text-center text-xs leading-relaxed text-muted-foreground">Teaching? <Link href="/register/teacher" className="font-bold text-primary underline-offset-4 hover:underline">Join as an educator</Link></p>
  </form>;
}
