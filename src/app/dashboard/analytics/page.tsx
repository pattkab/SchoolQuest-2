import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, BookOpen, AlertTriangle, TrendingUp, Calendar, Trophy, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default async function AnalyticsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const user = await db.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    redirect("/login");
  }

  // Fetch all attempts with related papers, questions and subjects
  const attempts = await db.attempt.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      paper: {
        include: {
          subject: true,
          questions: true,
        }
      },
      answers: true,
    }
  });

  // Calculate metrics
  const totalAttempts = attempts.length;
  let totalScore = 0;
  let totalPossible = 0;

  // Track scores by subject
  const subjectScores: Record<string, { earned: number; possible: number; name: string }> = {};

  attempts.forEach((att) => {
    const paperMaxPoints = att.paper.questions.reduce((sum, q) => sum + q.points, 0);
    totalScore += att.score;
    totalPossible += paperMaxPoints;

    const subName = att.paper.subject.name;
    if (!subjectScores[subName]) {
      subjectScores[subName] = { earned: 0, possible: 0, name: subName };
    }
    subjectScores[subName].earned += att.score;
    subjectScores[subName].possible += paperMaxPoints;
  });

  const avgPercentage = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

  // Identify Weak Areas (subjects < 70%)
  const weakAreas = Object.values(subjectScores)
    .map((sub) => ({
      name: sub.name,
      percentage: sub.possible > 0 ? Math.round((sub.earned / sub.possible) * 100) : 0
    }))
    .filter((sub) => sub.percentage < 70);

  // Badges logic
  const badges = [];
  if (totalAttempts >= 1) {
    badges.push({
      title: "First Step",
      desc: "Completed your first past paper practice!",
      icon: Trophy,
      color: "text-blue-500 bg-blue-50"
    });
  }
  const hasPerfectScore = attempts.some((att) => {
    const maxPts = att.paper.questions.reduce((sum, q) => sum + q.points, 0);
    return att.score === maxPts && maxPts > 0;
  });
  if (hasPerfectScore) {
    badges.push({
      title: "Perfect Score",
      desc: "Scored 100% on a past paper!",
      icon: Award,
      color: "text-yellow-500 bg-yellow-50"
    });
  }
  if (totalAttempts >= 3) {
    badges.push({
      title: "Quest Veteran",
      desc: "Finished 3 or more exam practices.",
      icon: Award,
      color: "text-green-500 bg-green-50"
    });
  }
  const isSubscriber = user.subscriptionEndsAt && user.subscriptionEndsAt > new Date();
  if (isSubscriber) {
    badges.push({
      title: "Momo Supporter",
      desc: "Active School Quest paying subscriber.",
      icon: Award,
      color: "text-purple-500 bg-purple-50"
    });
  }

  return (
    <div className="space-y-8 py-4">
      <div>
        <h2 className="text-3xl font-black text-gray-800">Your Progress Dashboard</h2>
        <p className="text-gray-500">Track your grades, earn badges, and correct your weak areas.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Attempts</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalAttempts}</div>
            <p className="text-xs text-gray-500">Exam papers completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Grade</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgPercentage}%</div>
            <p className="text-xs text-gray-500">Across all attempted subjects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Points Earned</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalScore}</div>
            <p className="text-xs text-gray-500">Out of {totalPossible} total available points</p>
          </CardContent>
        </Card>
      </div>

      {/* Weak Areas & Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weak Areas */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-red-700">
              <AlertTriangle className="h-5 w-5" /> Focus Areas
            </CardTitle>
            <CardDescription>
              Subjects where your average score is currently below 70%.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            {weakAreas.length === 0 ? (
              <div className="text-center py-6">
                <CheckCircle2 className="h-10 w-10 text-green-500 mx-auto" />
                <p className="text-gray-500 font-semibold mt-2">Excellent! No weak areas detected.</p>
                <p className="text-xs text-gray-400 mt-1">Keep practicing to maintain your scores.</p>
              </div>
            ) : (
              weakAreas.map((area) => (
                <div key={area.name} className="space-y-1">
                  <div className="flex justify-between text-sm font-bold">
                    <span>{area.name}</span>
                    <span className="text-red-600">{area.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${area.percentage}%` }} />
                  </div>
                  <p className="text-xs text-gray-400 italic">
                    Tip: Try reviewing questions under {area.name} again in practice mode.
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-xl">Earned Badges</CardTitle>
            <CardDescription>
              Unlock achievements as you complete challenges.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {badges.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <Award className="h-10 w-10 text-gray-300 mx-auto" />
                <p className="mt-2 font-semibold">No badges unlocked yet.</p>
                <p className="text-xs text-gray-400">Complete your first exam to unlock a badge.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {badges.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.title} className="flex items-center gap-3 p-3 border rounded-xl hover:shadow-sm transition-shadow">
                      <div className={`p-2 rounded-lg ${b.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-800">{b.title}</h4>
                        <p className="text-[10px] text-gray-400 leading-tight mt-0.5">{b.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Practice History</CardTitle>
          <CardDescription>Review all your previous papers and final scores.</CardDescription>
        </CardHeader>
        <CardContent>
          {attempts.length === 0 ? (
            <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed text-gray-500">
              No exams practiced yet.
            </div>
          ) : (
            <div className="divide-y">
              {attempts.map((att) => {
                const maxPoints = att.paper.questions.reduce((sum, q) => sum + q.points, 0);
                return (
                  <div key={att.id} className="flex justify-between items-center py-4 first:pt-0 last:pb-0">
                    <div className="space-y-1">
                      <span className="font-bold text-gray-800">{att.paper.title}</span>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{new Date(att.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{att.paper.subject.name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-primary">
                        {att.score} / {maxPoints}
                      </span>
                      <p className="text-[10px] text-gray-400">Points</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
