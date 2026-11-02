import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser, isAccreditedTeacher, isAdmin } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DigitizationQueuePage() {
  const user = await requireUser();
  if (!isAccreditedTeacher(user) && !isAdmin(user.role)) redirect("/dashboard");
  const jobs = await db.digitizationJob.findMany({
    where: isAdmin(user.role) ? {} : { createdById: user.id },
    orderBy: { createdAt: "desc" },
    take: 30,
  });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-3xl">Papers being read</h1>
        <p className="text-muted-foreground mt-1">A paper stays hidden until you approve it and then publish it.</p>
      </div>
      {jobs.length === 0 ? <p>No papers are waiting.</p> : (
        <ul className="space-y-2">
          {jobs.map((job) => (
            <li key={job.id}>
              <Link href={`/dashboard/teacher/digitization/${job.id}`} className="flex items-center justify-between rounded-2xl border bg-white px-4 py-3">
                <span className="font-medium">{job.title || job.fileName}</span>
                <span className="text-sm text-muted-foreground">{job.status.replaceAll("_", " ").toLowerCase()}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
