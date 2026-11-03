import { ProfilePictureForm } from "./ProfilePictureForm";
import { uploadedPhotoPrefix } from "@/components/avatar-options";
import Link from 'next/link';
import { requireUser } from '@/lib/session';
import { pathwayForRole } from '@/lib/pathways';
import { ProfileAvatar } from '@/components/profile-avatar';
import { classWithTerm } from '@/lib/taxonomy';
import { UserRound, GraduationCap, Flame, Sparkles, ArrowUpRight, ShieldCheck, School, Phone, Mail, Settings } from 'lucide-react';

export default async function ProfilePage() {
  const user = await requireUser();
  const pathway = pathwayForRole(user.role);
  return <div className="max-w-3xl mx-auto space-y-4"><div><h1 className="font-display">Profile</h1></div>
    <section className="profile-banner"><ProfileAvatar name={user.name} image={user.image} avatar={user.avatarSeed} className="profile-avatar" /><div><h2 className="font-display text-2xl">{user.name || 'Your profile'}</h2><p className="mt-1 text-sm text-muted-foreground">{pathway.label}{user.classGrade ? ` · ${classWithTerm(user.classGrade.shortName)}` : ''}</p><span className="context-chip mt-3"><ShieldCheck className="h-3.5 w-3.5" /> {user.teacherProfile?.status === 'ACCREDITED' ? 'Accredited educator' : 'SchoolQuest member'}</span></div></section>
    <ProfilePictureForm hasGooglePhoto={Boolean(user.image)} current={user.avatarSeed?.startsWith(uploadedPhotoPrefix) ? "upload" : user.avatarSeed || (user.image ? "google" : "initials")} />
    {user.role === 'STUDENT'  && <section className="grid grid-cols-2 gap-3"><div className="metric-card tone-peach"><Flame className="h-5 w-5" /><strong>{user.currentStreak}</strong><span>Day learning streak</span></div><div className="metric-card tone-lilac"><Sparkles className="h-5 w-5" /><strong>{user.xp}</strong><span>Learning XP earned</span></div></section>}
    <section className="quest-panel"><h2 className="font-display text-lg">About you</h2><dl className="profile-details">{[{ icon: UserRound, label: 'Your space', value: pathway.label }, { icon: Phone, label: 'Phone', value: user.phone }, { icon: Mail, label: 'Email', value: user.email }, { icon: GraduationCap, label: 'Class', value: user.classGrade ? classWithTerm(user.classGrade.shortName) : null }, { icon: School, label: 'School', value: user.ownedSchool?.name || user.school }, { icon: School, label: 'District', value: user.district }].filter(item => item.value).map(({ icon: Icon, label, value }) => <div key={label}><dt><Icon className="h-4 w-4" />{label}</dt><dd>{value}</dd></div>)}</dl><div className="mt-5 flex flex-wrap gap-2"><Link href="/setup" className="quest-button">Edit my profile <ArrowUpRight className="h-4 w-4" /></Link><Link href="/dashboard/settings" className="quest-button quest-button-secondary">Settings <Settings className="h-4 w-4" /></Link></div></section>
  </div>;
}
