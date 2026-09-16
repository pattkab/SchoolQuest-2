import { db } from "@/lib/db";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const levels = await db.level.findMany({
    orderBy: { order: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Select a Level</h2>
        <p className="text-gray-500">Choose your academic level to find past papers.</p>
      </div>

      {levels.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-lg border border-dashed">
          <p className="text-gray-500">No levels configured yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {levels.map((level: { id: string; name: string }) => (
            <Link key={level.id} href={`/dashboard/levels/${level.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle>{level.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
