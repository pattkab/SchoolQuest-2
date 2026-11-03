import Link from 'next/link';
import { BrandMark } from '@/components/shell';
import { PRIVACY_POLICY_URL, DELETION_EMAIL_URL, SUPPORT_EMAIL } from '@/lib/privacy';
import { LeaveNote } from '@/components/leave-note';
import { COMPANY_LINE } from '@/lib/company';

export const metadata = { title: 'Request account deletion | School Quest' };

export default function DeleteAccountPage() {
  return <div className="min-h-screen bg-background px-5 py-8"><div className="mx-auto max-w-2xl space-y-7">
    <BrandMark />
    <main className="quest-panel space-y-5">
      <p className="eyebrow">YOUR INFORMATION, YOUR CHOICE</p>
      <h1 className="font-display text-3xl">Request account deletion</h1>
      <p>To delete your School Quest account and associated profile and learning records, email our support team. A parent or guardian can request deletion for their child.</p>
      <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed"><li>Email <a className="font-bold text-primary underline" href={DELETION_EMAIL_URL}>{SUPPORT_EMAIL}</a> with the subject <strong>School Quest account deletion</strong>.</li><li>Include the account’s registered phone number or email. If requesting for a child, explain your relationship. Do not send a password or full identity document.</li><li>We will verify ownership or authority and aim to complete verified requests within 30 days. We will explain any delay or lawful retention exception.</li></ol>
      <a className="quest-button" href={DELETION_EMAIL_URL}>Email a deletion request</a>
      <LeaveNote />
      <p className="text-sm leading-relaxed">Removing the Android app does not tell us, and it does not delete the account. Use the form above if you want us to know why.</p>
      <p className="text-sm leading-relaxed text-muted-foreground">The request covers the account and associated profile and learning records. We request deletion from relevant service providers where applicable. Records needed for legal obligations, fraud investigations, purchase disputes, or a school’s independent recordkeeping may require separate retention; we will explain any exception. Uninstalling the app does not delete an account.</p>
      <p className="text-sm leading-relaxed text-muted-foreground">Account deletion does not automatically cancel store subscriptions. Manage subscriptions through Google Play or Apple settings. You can request deletion without making another purchase.</p>
      <div className="flex flex-wrap gap-5 text-sm font-bold text-primary"><a href={PRIVACY_POLICY_URL}>Read the privacy policy</a><Link href="/">Back to School Quest</Link></div>
    </main>
  </div></div>;
}
