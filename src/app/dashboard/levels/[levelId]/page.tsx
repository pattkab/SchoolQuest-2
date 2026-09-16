import { db } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
      subjects: true,
    },
  });

  if (!level) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold">{level.name}</h2>
          <p className="text-gray-500">Select a subject to view available past papers.</p>
        </div>
      </div>

      {level.subjects.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-lg border border-dashed">
          <p className="text-gray-500">No subjects added for this level yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {level.subjects.map((subject) => (
            <Link key={subject.id} href={`/dashboard/subjects/${subject.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle>{subject.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
