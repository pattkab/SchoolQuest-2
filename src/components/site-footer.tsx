import Link from 'next/link';
import { PRIVACY_POLICY_URL } from '@/lib/privacy';
import { COMPANY_LINE, PRODUCTS_URL, WHATSAPP_URL } from '@/lib/company';
export function SiteFooter() {
  return <footer className="border-t bg-white/70 px-5 py-7"><div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"><p className="text-xs leading-snug text-muted-foreground">{COMPANY_LINE}</p><div className="flex flex-wrap justify-center gap-4 text-xs font-semibold"><a href={PRODUCTS_URL}>Products</a><a href={WHATSAPP_URL}>WhatsApp</a><a href={PRIVACY_POLICY_URL}>Privacy</a><Link href="/delete-account">Delete account</Link></div><details className="max-w-md text-xs text-muted-foreground"><summary className="cursor-pointer font-semibold">Curriculum & content sources</summary><p className="mt-2 leading-relaxed">Some resources link to Fresh Teacher’s public GitHub repository. Permission to reuse those files is in progress. No institutional endorsement is claimed.</p></details></div></footer>;
}
