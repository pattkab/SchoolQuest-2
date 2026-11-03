import Link from "next/link";
import { ArrowUpRight, Flame, GraduationCap, Mail, Phone, School, Settings, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { uploadedPhotoPrefix } from "@/components/avatar-options";
import { ProfileAvatar } from "@/components/profile-avatar";
import { pathwayForRole } from "@/lib/pathways";
import { requireUser } from "@/lib/session";
import { classWithTerm } from "@/lib/taxonomy";
import { ProfilePictureForm } from "./ProfilePictureForm";

export default async function ProfilePage() {
  const user = await requireUser();
  const pathway = pathwayForRole(user.role);
  const grade = user.classGrade ? classWithTerm(user.classGrade.shortName) : null;
  const picture = user.avatarSeed?.startsWith(uploadedPhotoPrefix)
    ? "upload"
    : user.avatarSeed || (user.image ? "google" : "initials");
  const details = [
    { icon: UserRound, label: "Your space", value: pathway.label },
    { icon: Phone, label: "Phone", value: user.phone },
    { icon: Mail, label: "Email", value: user.email },
    { icon: GraduationCap, label: "Class", value: grade },
    { icon: School, label: "School", value: user.ownedSchool?.name || user.school },
    { icon: School, label: "District", value: user.district },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="font-display">Profile</h1>
      <section className="profile-banner">
        <ProfileAvatar name={user.name} image={user.image} avatar={user.avatarSeed} className="profile-avatar" />
        <div>
          <h2 className="font-display text-2xl">{user.name || "Your profile"}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{pathway.label}{grade ? ` · ${grade}` : ""}</p>
          <span className="context-chip mt-3">
            <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
            {user.teacherProfile?.status === "ACCREDITED" ? "Accredited educator" : "SchoolQuest member"}
          </span>
        </div>
      </section>

      <ProfilePictureForm hasGooglePhoto={Boolean(user.image)} current={picture} />

      {user.role === "STUDENT" && (
        <section aria-label="Learning progress" className="grid grid-cols-2 gap-3">
          <div className="metric-card tone-peach">
            <Flame aria-hidden="true" className="h-5 w-5" />
            <strong>{user.currentStreak}</strong><span>Day learning streak</span>
          </div>
          <div className="metric-card tone-lilac">
            <Sparkles aria-hidden="true" className="h-5 w-5" />
            <strong>{user.xp}</strong><span>Learning XP earned</span>
          </div>
        </section>
      )}

      <section className="quest-panel">
        <h2 className="font-display text-lg">About you</h2>
        <dl className="profile-details">
          {details.filter(({ value }) => value).map(({ icon: Icon, label, value }) => (
            <div key={label}>
              <dt><Icon aria-hidden="true" className="h-4 w-4" />{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/setup" className="quest-button">Edit my profile <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
          <Link href="/dashboard/settings" className="quest-button quest-button-secondary">Settings <Settings aria-hidden="true" className="h-4 w-4" /></Link>
        </div>
      </section>

      {user.role === "STUDENT" && (
        <section className="quest-panel">
          <h2 className="font-display text-lg">Subscription</h2>
          <p className="mt-2 text-sm text-muted-foreground">See your Premium status, payment history, or redeem a promo code.</p>
          <Link href="/dashboard/subscribe" className="quest-button quest-button-secondary mt-4">Manage subscription</Link>
        </section>
      )}
    </div>
  );
}
