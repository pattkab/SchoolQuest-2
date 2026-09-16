import { db } from "@/lib/db";
import { auth } from "@/auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, History, AlertCircle } from "lucide-react";

interface SubjectPageProps {
  params: Promise<{
    subjectId: string;
  }>;
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;
  const { subjectId } = await params;

  const subject = await db.subject.findUnique({
    where: { id: subjectId },
    include: {
      level: true,
      papers: {
        orderBy: { year: 'desc' },
        include: {
          questions: {
            select: {
              correctAnswer: true
            }
          }
        }
      }
    },
  });

  if (!subject) {
    notFound();
  }

  // Fetch all user attempts for these papers
  const userAttempts = await db.attempt.findMany({
    where: {
      userId,
      paperId: {
        in: subject.papers.map((p) => p.id)
      }
    }
  });

  // Map attempts to paperId for O(1) checks
  const attemptCounts: Record<string, number> = {};
  userAttempts.forEach((att) => {
    attemptCounts[att.paperId] = (attemptCounts[att.paperId] || 0) + 1;
  });

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/levels/${subject.levelId}`}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">{subject.name} - {subject.level.name}</h2>
          <p className="text-gray-500 text-sm mt-0.5">Select a UNEB past paper to test your knowledge.</p>
        </div>
      </div>

      {subject.papers.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <p className="text-gray-500 font-bold">No Papers Available</p>
          <p className="text-xs text-gray-400 mt-1">Check back later or upload a paper as Admin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {subject.papers.map((paper) => {
            const count = attemptCounts[paper.id] || 0;
            const hasAnswers = paper.questions.some(
              (q) => q.correctAnswer !== '""' && q.correctAnswer !== "" && q.correctAnswer !== null
            );

            return (
              <Link key={paper.id} href={`/dashboard/papers/${paper.id}`}>
                <Card className="hover:shadow-md transition-all cursor-pointer rounded-2xl border border-gray-100 hover:border-primary/30 p-5 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-bold text-gray-900">{paper.title}</CardTitle>
                      {paper.year && (
                        <CardDescription className="text-xs font-semibold text-gray-400">UNEB Year: {paper.year}</CardDescription>
                      )}
                    </div>
                    
                    {/* Visual Badges indicating details */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Answers Badge */}
                      {hasAnswers ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Auto-Graded
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-500 text-xs font-bold px-3 py-1 rounded-full border border-gray-200">
                          <AlertCircle className="h-3.5 w-3.5" /> Practice Only
                        </span>
                      )}

                      {/* Attempt Status Badge */}
                      {count > 0 ? (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
                          <History className="h-3.5 w-3.5" /> Attempted ({count}x)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
                          Unattempted
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
