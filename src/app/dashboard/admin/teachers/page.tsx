import { db } from "@/lib/db";
import { requireUser, isAdmin } from "@/lib/session";
import { redirect } from "next/navigation";
import { reviewTeacherAction } from "@/app/actions/marking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function AdminTeachersPage() {
  const user = await requireUser();
  if (!isAdmin(user.role)) redirect("/dashboard");

  const teachers = await db.teacherProfile.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-5">
      <h1 className="font-display text-4xl">Teacher accreditation</h1>
      {teachers.map((teacher) => (
        <article key={teacher.id} className="rounded-[1.6rem] bg-white border p-5 space-y-2">
          <div className="flex flex-wrap justify-between gap-2">
            <div>
              <p className="font-display text-2xl">{teacher.fullName}</p>
              <p className="text-sm text-muted-foreground">
                {teacher.registrationNumber} · {teacher.qualification} · {teacher.school}, {teacher.district}
              </p>
              <p className="text-sm">{teacher.user.phone} · {teacher.yearsExperience} years · {teacher.status}</p>
            </div>
          </div>
          {teacher.bio && <p className="text-sm">{teacher.bio}</p>}
          <div className="flex flex-wrap gap-2 items-center">
            <form action={reviewTeacherAction} className="flex flex-wrap gap-2 items-center">
              <input type="hidden" name="profileId" value={teacher.id} />
              <input type="hidden" name="status" value="ACCREDITED" />
              <Input name="reviewNote" placeholder="Note" className="rounded-2xl max-w-xs" />
              <Button className="rounded-2xl">Accredit</Button>
            </form>
            <form action={reviewTeacherAction}>
              <input type="hidden" name="profileId" value={teacher.id} />
              <input type="hidden" name="status" value="REJECTED" />
              <Button variant="outline" className="rounded-2xl">Reject</Button>
            </form>
          </div>
        </article>
      ))}
    </div>
  );
}
