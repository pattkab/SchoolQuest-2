import Link from 'next/link';
import { requireUser, homeForRole } from '@/lib/session';
import { pathwayForRole } from '@/lib/pathways';
import { signOut } from '@/auth';
import { PRIVACY_POLICY_URL } from '@/lib/privacy';
import { UserRound, GraduationCap, Flame, Sparkles, ArrowUpRight, LogOut, ShieldCheck, School, Phone, Mail } from 'lucide-react';

export default async function ProfilePage() {
  const user = await requireUser();
  const pathway = pathwayForRole(user.role);
  return <div className="max-w-3xl mx-auto space-y-6"><div><p className="eyebrow">YOUR OWN LITTLE CORNER</p><h1 className="font-display mt-2">My profile</h1><p className="mt-2 text-sm text-muted-foreground">Your learning identity, all in one place.</p></div>
    <section className="profile-banner"><span className="profile-avatar">{(user.name || 'SQ').split(' ').slice(0, 2).map(part => part[0]).join('')}</span><div><h2 className="font-display text-2xl">{user.name || 'Your profile'}</h2><p className="mt-1 text-sm text-muted-foreground">{pathway.label}{user.classGrade ? ` · ${user.classGrade.name}` : ''}</p><span className="context-chip mt-3"><ShieldCheck className="h-3.5 w-3.5" /> {user.teacherProfile?.status === 'ACCREDITED' ? 'Accredited educator' : 'SchoolQuest member'}</span></div></section>
    {user.role === 'STUDENT' && <section className="grid grid-cols-2 gap-3"><div className="metric-card tone-peach"><Flame className="h-5 w-5" /><strong>{user.currentStreak}</strong><span>Day learning streak</span></div><div className="metric-card tone-lilac"><Sparkles className="h-5 w-5" /><strong>{user.xp}</strong><span>Learning XP earned</span></div></section>}
    <section className="quest-panel"><h2 className="font-display text-lg">About you</h2><dl className="profile-details">{[{ icon: UserRound, label: 'Your space', value: pathway.label }, { icon: Phone, label: 'Phone', value: user.phone }, { icon: Mail, label: 'Email', value: user.email }, { icon: GraduationCap, label: 'Class', value: user.classGrade?.name }, { icon: School, label: 'School', value: user.school }].filter(item => item.value).map(({ icon: Icon, label, value }) => <div key={label}><dt><Icon className="h-4 w-4" />{label}</dt><dd>{value}</dd></div>)}</dl><Link href="/setup" className="quest-button mt-5">Edit my profile <ArrowUpRight className="h-4 w-4" /></Link></section>
    <Link href={homeForRole(user.role)} className="quest-panel flex items-center justify-between font-bold text-sm">Back to my dashboard <ArrowUpRight className="h-4 w-4 text-primary" /></Link>
    <section className="quest-panel"><h2 className="font-display text-lg">Privacy and account controls</h2><div className="mt-4 flex flex-wrap gap-5 text-sm font-bold text-primary"><a href={PRIVACY_POLICY_URL}>Privacy policy</a><Link href="/delete-account">Request account deletion</Link></div></section>
    <form action={async () => { 'use server'; await signOut({ redirectTo: '/login' }); }}><button className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border bg-white text-sm font-bold text-muted-foreground"><LogOut className="h-4 w-4" /> Sign out</button></form>
  </div>;
}
