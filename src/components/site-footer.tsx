import Link from 'next/link';
import { PRIVACY_POLICY_URL } from '@/lib/privacy';
import { GraduationCap } from 'lucide-react';
export function SiteFooter() {
  return <footer className="border-t bg-white/70 px-5 py-7"><div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"><p className="flex items-center gap-2 text-xs font-extrabold tracking-wider"><GraduationCap className="h-5 w-5 text-primary" /> SCHOOLQUEST <span className="font-normal tracking-normal text-muted-foreground">· Learn. Practise. Grow.</span></p><div className="flex gap-4 text-xs font-semibold text-primary"><a href={PRIVACY_POLICY_URL}>Privacy policy</a><Link href="/delete-account">Account deletion</Link></div><details className="max-w-md text-xs text-muted-foreground"><summary className="cursor-pointer font-semibold">Curriculum & content sources</summary><p className="mt-2 leading-relaxed">Some resources link to Fresh Teacher’s public GitHub repository. Permission to reuse those files is in progress. No institutional endorsement is claimed.</p></details></div></footer>;
}
