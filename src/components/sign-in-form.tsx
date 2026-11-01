"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { GraduationCap, Presentation, School, ShieldCheck, ArrowRight, Eye, EyeOff, LoaderCircle, Phone, LockKeyhole, Check } from "lucide-react";
import { loginAction } from "@/app/actions/auth";
import { PATHWAYS, pathwayById, type PathwayId } from "@/lib/pathways";

const roleIcons = { student: GraduationCap, teacher: Presentation, school: School, site: ShieldCheck };
const roleNames = { student: 'Learner', teacher: 'Teacher', school: 'School', site: 'Admin' };
const roleDescriptions = { student: 'My learning journey', teacher: 'My teaching space', school: 'My school community', site: 'Platform management' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} className="quest-button w-full" aria-busy={pending}>
    {pending ? <><LoaderCircle className="h-5 w-5 animate-spin" /> Signing you in…</> : <>Let’s get started <ArrowRight className="h-5 w-5" /></>}
  </button>;
}

export function SignInForm({ pathway }: { pathway?: string }) {
  const [role, setRole] = useState<PathwayId>(pathwayById(pathway).id);
  const [showPassword, setShowPassword] = useState(false);
  return <form action={loginAction} className="space-y-4">
    <input type="hidden" name="pathway" value={role} />
    <input type="hidden" name="intent" value={role === 'site' ? 'ADMIN' : role === 'teacher' ? 'TEACHER' : 'STUDENT'} />
    <fieldset>
      <legend className="mb-2 text-sm font-bold text-[var(--ink)]">I’m here as a…</legend>
      <div className="grid grid-cols-2 gap-2">
        {PATHWAYS.map(item => {
          const Icon = roleIcons[item.id];
          const selected = role === item.id;
          return <button key={item.id} type="button" aria-pressed={selected} onClick={() => setRole(item.id)} className={`role-choice ${selected ? 'is-selected' : ''}`}>
            <span className={`role-choice-icon role-${item.id}`}><Icon className="h-5 w-5" /></span>
            <span className="min-w-0"><span className="block text-sm font-extrabold">{roleNames[item.id]}</span><span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">{roleDescriptions[item.id]}</span></span>
            {selected && <Check className="absolute right-2 top-2 h-3.5 w-3.5 text-primary" />}
          </button>;
        })}
      </div>
    </fieldset>
    <div className="space-y-1.5">
      <label htmlFor="phone" className="text-sm font-bold">Phone number</label>
      <div className="quest-input-wrap"><Phone className="h-4 w-4" aria-hidden="true" /><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="e.g. 0700 123 456" /></div>
    </div>
    <div className="space-y-1.5">
      <label htmlFor="password" className="text-sm font-bold">PIN or password</label>
      <div className="quest-input-wrap"><LockKeyhole className="h-4 w-4" aria-hidden="true" /><input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required placeholder="Enter your PIN or password" />
        <button type="button" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl hover:bg-muted" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={() => setShowPassword(value => !value)}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
      </div>
    </div>
    <SubmitButton />
    <p className="text-center text-xs leading-relaxed text-muted-foreground">Teaching the next generation? <Link href="/register/teacher" className="font-bold text-primary underline-offset-4 hover:underline">Join as an educator</Link></p>
  </form>;
}
