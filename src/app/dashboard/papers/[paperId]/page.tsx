import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import ExamPlayer from "./ExamPlayer";

interface PaperPageProps {
  params: Promise<{
    paperId: string;
  }>;
}

export default async function PaperPage({ params }: PaperPageProps) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) {
    redirect("/login");
  }

  // Active check
  const now = new Date();
  const hasActiveTrial = user.trialEndsAt && user.trialEndsAt > now;
  const hasActiveSubscription = user.subscriptionEndsAt && user.subscriptionEndsAt > now;

  if (!hasActiveTrial && !hasActiveSubscription) {
    redirect("/dashboard/subscribe");
  }

  const { paperId } = await params;

  const paper = await db.paper.findUnique({
    where: { id: paperId },
    include: {
      questions: {
        orderBy: { order: "asc" }
      }
    }
  });

  if (!paper) {
    notFound();
  }

  return (
    <div className="py-6">
      <ExamPlayer
        paperId={paper.id}
        paperTitle={paper.title}
        questions={paper.questions.map((q) => ({
          id: q.id,
          type: q.type,
          prompt: q.prompt,
          options: q.options,
          points: q.points,
        }))}
      />
    </div>
  );
}
