import { db } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface SubjectPageProps {
  params: Promise<{
    subjectId: string;
  }>;
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { subjectId } = await params;

  const subject = await db.subject.findUnique({
    where: { id: subjectId },
    include: {
      level: true,
      papers: {
        orderBy: { year: 'desc' }
      }
    },
  });

  if (!subject) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/levels/${subject.levelId}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold">{subject.name} - {subject.level.name}</h2>
          <p className="text-gray-500">Select a past paper to practice.</p>
        </div>
      </div>

      {subject.papers.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-lg border border-dashed">
          <p className="text-gray-500">No papers available for this subject yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {subject.papers.map((paper) => (
            <Link key={paper.id} href={`/dashboard/papers/${paper.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{paper.title}</CardTitle>
                  {paper.year && (
                    <CardDescription>Year: {paper.year}</CardDescription>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
