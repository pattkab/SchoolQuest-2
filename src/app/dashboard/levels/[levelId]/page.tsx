import { db } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Compass, Calculator, Layers } from "lucide-react";

interface LevelPageProps {
  params: Promise<{
    levelId: string;
  }>;
}

export default async function LevelPage({ params }: LevelPageProps) {
  const { levelId } = await params;

  const level = await db.level.findUnique({
    where: { id: levelId },
    include: {
      subjects: {
        include: {
          papers: {
            select: { id: true }
          }
        }
      },
    },
  });

  if (!level) {
    notFound();
  }

  // Helper to color-code subjects based on UNEB standards
  const getSubjectStyles = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("math")) {
      return {
        bg: "bg-emerald-50 hover:border-emerald-200 hover:shadow-emerald-50/50",
        iconBg: "bg-emerald-100 text-emerald-600",
        icon: Calculator,
        desc: "Prepare with specialized mathematical sets and calculations."
      };
    } else if (n.includes("english")) {
      return {
        bg: "bg-sky-50 hover:border-sky-200 hover:shadow-sky-50/50",
        iconBg: "bg-sky-100 text-sky-600",
        icon: BookOpen,
        desc: "Grammar, comprehension, and structural rearrangement guides."
      };
    } else if (n.includes("science")) {
      return {
        bg: "bg-amber-50 hover:border-amber-200 hover:shadow-amber-50/50",
        iconBg: "bg-amber-100 text-amber-600",
        icon: Compass,
        desc: "Anatomy, electricity, agriculture, and general science mock papers."
      };
    } else {
      return {
        bg: "bg-purple-50 hover:border-purple-200 hover:shadow-purple-50/50",
        iconBg: "bg-purple-100 text-purple-600",
        icon: Layers,
        desc: "Complete coursework syllabus, mock structures, and resources."
      };
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">{level.name}</h2>
          <p className="text-gray-500 text-sm mt-0.5">Select a subject to view available UNEB past papers.</p>
        </div>
      </div>

      {level.subjects.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto" />
          <p className="text-gray-500 font-bold mt-3">No Subjects Configured</p>
          <p className="text-xs text-gray-400 mt-1">Check back later or upload papers as Admin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {level.subjects.map((subject) => {
            const styles = getSubjectStyles(subject.name);
            const Icon = styles.icon;
            const paperCount = subject.papers.length;

            return (
              <Link key={subject.id} href={`/dashboard/subjects/${subject.id}`}>
                <Card className={`rounded-3xl border-2 border-transparent hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer p-6 flex flex-col justify-between h-full bg-white ${styles.bg}`}>
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${styles.iconBg}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-xl font-bold tracking-tight text-gray-900">
                        {subject.name}
                      </CardTitle>
                      <CardDescription className="text-xs leading-relaxed text-gray-500">
                        {styles.desc}
                      </CardDescription>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-xs font-bold text-muted-foreground bg-white/60 p-2.5 rounded-2xl border border-gray-100">
                    <span>Available Papers</span>
                    <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-black">
                      {paperCount} {paperCount === 1 ? 'Paper' : 'Papers'}
                    </span>
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
