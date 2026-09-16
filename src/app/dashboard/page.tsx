import { auth } from "@/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, BarChart3, GraduationCap, BookOpen, Sparkles, ShieldCheck } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  let isAdmin = false;

  if (session?.user?.id) {
    const user = await db.user.findUnique({
      where: { id: session.user.id }
    });
    if (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN" || user?.role === "TEACHER") {
      isAdmin = true;
    }
  }

  const levels = await db.level.findMany({
    orderBy: { order: 'asc' }
  });

  // Level icons helper
  const getLevelStyles = (name: string) => {
    switch (name.toLowerCase()) {
      case "nursery":
        return {
          bg: "bg-amber-50 hover:border-amber-200",
          iconBg: "bg-amber-100 text-amber-600",
          desc: "Fun and engaging visual papers for early learners."
        };
      case "primary":
        return {
          bg: "bg-emerald-50 hover:border-emerald-200",
          iconBg: "bg-emerald-100 text-emerald-600",
          desc: "Practice P1 - P7 papers to master your PLE exams."
        };
      case "secondary o-level":
      case "secondary a-level":
      case "secondary":
        return {
          bg: "bg-sky-50 hover:border-sky-200",
          iconBg: "bg-sky-100 text-sky-600",
          desc: "Standard past papers targeting UCE & UACE candidates."
        };
      default:
        return {
          bg: "bg-purple-50 hover:border-purple-200",
          iconBg: "bg-purple-100 text-purple-600",
          desc: "Advanced subject past papers and university guides."
        };
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Decorative Hero Banner with smiling students in uniform */}
      <div className="relative overflow-hidden rounded-3xl bg-primary text-white p-6 md:p-10 shadow-lg flex flex-col md:flex-row items-center gap-6">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-transparent z-10" />
        
        {/* Banner Copy */}
        <div className="space-y-4 md:w-3/5 z-20 relative text-left">
          <span className="inline-flex items-center gap-1.5 bg-white/20 text-white font-bold px-3.5 py-1 rounded-full text-xs">
            <Sparkles className="h-3.5 w-3.5" /> Study & Excel
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
            Learn Today, Lead Tomorrow!
          </h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed font-medium">
            Practice real past papers with instant marking and clear explanations. Your journey to academic excellence starts right here.
          </p>
        </div>

        {/* Happy student image */}
        <div className="w-full md:w-2/5 h-48 md:h-64 relative rounded-2xl overflow-hidden z-20 shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
            alt="Smiling Ugandan Primary Students in School Uniform"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* Admin Action Center (Highest Priority for logged-in Admin) */}
      {isAdmin && (
        <Card className="rounded-3xl border-2 border-emerald-200 bg-emerald-50/20 shadow-md animate-fade-in overflow-hidden">
          <CardHeader className="bg-emerald-50 border-b border-emerald-100 py-4 px-6 flex flex-row items-center gap-3">
            <div className="bg-emerald-600 text-white p-2 rounded-xl">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-black text-emerald-900">Admin Command Center</CardTitle>
              <CardDescription className="text-emerald-700">Quickly manage questions, parse documents, and monitor subscriber revenues.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Action 1: Upload past paper */}
            <Link href="/dashboard/teacher/upload" className="block group">
              <div className="p-5 border-2 border-dashed border-emerald-200 hover:border-emerald-500 bg-white rounded-2xl transition-all duration-300 hover:shadow-sm flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-105 transition-transform">
                  <UploadCloud className="h-8 w-8" />
                </div>
                <div className="text-left">
                  <h4 className="font-extrabold text-emerald-950 text-lg group-hover:text-emerald-600 transition-colors">Post New Past Paper</h4>
                  <p className="text-xs text-emerald-700/80 mt-1">Upload a PDF to let Gemini auto-extract interactive questions.</p>
                </div>
              </div>
            </Link>

            {/* Action 2: Analytics / reports */}
            <Link href="/dashboard/admin/analytics" className="block group">
              <div className="p-5 border-2 border-dashed border-purple-200 hover:border-purple-500 bg-white rounded-2xl transition-all duration-300 hover:shadow-sm flex items-center gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:scale-105 transition-transform">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <div className="text-left">
                  <h4 className="font-extrabold text-purple-950 text-lg group-hover:text-purple-600 transition-colors">Subscription Reports</h4>
                  <p className="text-xs text-purple-700/80 mt-1">Monitor real-time revenue cohorts and aggregate trial churn.</p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Curriculum Levels */}
      <div className="space-y-4 text-left">
        <div>
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">Select Academic Level</h3>
          <p className="text-gray-500 text-sm mt-0.5">Explore standard curricula tailored for your classes.</p>
        </div>

        {levels.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto" />
            <p className="text-gray-500 font-bold mt-3">No Levels Seeded Yet</p>
            <p className="text-xs text-gray-400 mt-1">Run `npx tsx prisma/seed.ts` inside the workspace.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {levels.map((level) => {
              const style = getLevelStyles(level.name);
              return (
                <Link key={level.id} href={`/dashboard/levels/${level.id}`}>
                  <Card className={`rounded-3xl border-2 border-transparent hover:shadow-md transition-all cursor-pointer h-full flex flex-col justify-between p-6 ${style.bg}`}>
                    <div className="space-y-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${style.iconBg}`}>
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-xl font-bold tracking-tight text-gray-900">{level.name}</CardTitle>
                        <p className="text-xs text-gray-500 leading-relaxed">{style.desc}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
