import { db } from "@/lib/db";
import { isAdmin } from "@/lib/session";

type Viewer = { id: string; role: string; schoolId: string | null };

export function reviewableAnswersWhere(viewer: Viewer) {
  const waiting = { gradingStatus: { in: ["PENDING_TEACHER", "AI"] } };
  if (isAdmin(viewer.role)) return waiting;
  return {
    ...waiting,
    attempt: {
      user: {
        OR: [
          ...(viewer.schoolId ? [{ schoolId: viewer.schoolId }] : []),
          { enrollments: { some: { classroom: { teacherId: viewer.id } } } },
        ],
      },
    },
  };
}

export function canViewContent(viewer: { id: string; role: string }, item: { status: string; authorId: string | null }) {
  if (item.status === "PUBLISHED") return true;
  if (isAdmin(viewer.role)) return true;
  return Boolean(item.authorId && item.authorId === viewer.id);
}

export async function canReviewLearner(viewer: Viewer, learnerId: string) {
  if (viewer.id === learnerId || isAdmin(viewer.role)) return true;
  if (viewer.role !== "TEACHER" && viewer.role !== "SCHOOL_ADMIN") return false;
  const learner = await db.user.findUnique({ where: { id: learnerId }, select: { schoolId: true } });
  if (!learner) return false;
  if (viewer.schoolId && learner.schoolId === viewer.schoolId) return true;
  const classroom = await db.enrollment.findFirst({
    where: { userId: learnerId, classroom: { teacherId: viewer.id } },
    select: { id: true },
  });
  return Boolean(classroom);
}
