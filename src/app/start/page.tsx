import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BrandMark } from "@/components/shell";
import { requireUser } from "@/lib/session";
import { pathwayForRole, type PathwayId } from "@/lib/pathways";

export const metadata: Metadata = { title: "Get started", robots: { index: false } };

const destinations: Record<PathwayId, { label: string; description: string; href: string }[]> = {
  student: [
    { label: "Learn and practise", description: "Find notes, quizzes and practice for your class.", href: "/dashboard/learn" },
    { label: "Browse the library", description: "Explore past papers and learning materials.", href: "/dashboard/library" },
    { label: "Watch and play", description: "Find educational videos and Kito’s mini quest.", href: "/dashboard#educational-videos" },
    { label: "See my progress", description: "See what you’ve completed and what to practise next.", href: "/dashboard/progress" },
  ],
  teacher: [
    { label: "Teaching dashboard", description: "See your teaching tools and accreditation status.", href: "/dashboard/teacher" },
    { label: "Find teaching materials", description: "Browse class notes and practice resources.", href: "/dashboard/learn" },
    { label: "School attendance", description: "Open your school’s attendance tools.", href: "/dashboard/school/attendance" },
  ],
  school: [
    { label: "Manage my school", description: "Go to enrolment and school administration.", href: "/dashboard/school" },
    { label: "Attendance", description: "Review school attendance.", href: "/dashboard/school/attendance" },
    { label: "Fees", description: "Open school fee records.", href: "/dashboard/school/fees" },
  ],
  site: [
    { label: "Manage the site", description: "Open your site management dashboard.", href: "/dashboard/admin" },
    { label: "Teacher applications", description: "Review teacher accreditation requests.", href: "/dashboard/admin/teachers" },
    { label: "Manage content", description: "Open the content library.", href: "/dashboard/admin/library" },
  ],
};

export default async function StartPage({ searchParams }: { searchParams: Promise<{ step?: string }> }) {
  const user = await requireUser();
  const pathway = pathwayForRole(user.role);
  const chooseDestination = (await searchParams).step === "destination";
  const missingDetails = !user.profileComplete || (user.role === "STUDENT" && !user.classGradeId)
    || (pathway.id === "school" && !user.ownedSchool);
  if (chooseDestination && missingDetails) redirect("/setup?from=start");

  return (
    <div data-space={pathway.id} className="min-h-screen">
      <main className="mx-auto max-w-2xl px-5 py-8">
        <BrandMark href="/" />
        <p className="space-label mt-8">{pathway.label} space · Step {chooseDestination ? 2 : 1} of 2</p>
        <h1 className="font-display mt-2">{chooseDestination ? "Where would you like to go?" : "Check your profile"}</h1>
        {chooseDestination ? (
          <>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {destinations[pathway.id].map(({ label, description, href }) => (
                <li key={href}>
                  <Link href={href} className="quest-panel block h-full hover:border-primary">
                    <span className="block font-bold text-primary">{label}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{description}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link className="space-back mt-4" href="/start">Back to profile step</Link>
          </>
        ) : (
          <>
            <p className="mt-3 text-muted-foreground">
              {missingDetails ? "Finish setting up your profile so we can take you to the right place." : "Update your details, or continue if they’re already right."}
            </p>
            <div className="quest-panel mt-5">
              <p className="font-bold">{user.name || "Your profile"}</p>
              {user.classGrade && <p className="text-muted-foreground">{user.classGrade.shortName}</p>}
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/setup?from=start" className={missingDetails ? "quest-button" : "quest-button quest-button-secondary"}>
                  {missingDetails ? "Finish setup" : "Update profile"}
                </Link>
                {!missingDetails && <Link href="/start?step=destination" className="quest-button">Continue</Link>}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
