import { auth, signOut } from "@/auth";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GraduationCap, LogOut, LayoutDashboard, LineChart, Upload, Shield } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  let isAdmin = false;
  
  if (session?.user?.id) {
    const user = await db.user.findUnique({
      where: { id: session.user.id }
    });
    // In Phase 1 Foundation, strictly enforcing ADMIN only for uploads
    if (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN" || user?.role === "TEACHER") {
      isAdmin = true;
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="bg-primary text-white p-1.5 rounded-lg">
            <GraduationCap className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-black text-foreground tracking-tight hidden sm:block">School Quest</h1>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="font-bold text-foreground gap-2 rounded-xl">
              <LayoutDashboard className="h-4 w-4" /> <span className="hidden sm:inline">Practice</span>
            </Button>
          </Link>
          <Link href="/dashboard/analytics">
            <Button variant="ghost" size="sm" className="font-bold text-foreground gap-2 rounded-xl">
              <LineChart className="h-4 w-4" /> <span className="hidden sm:inline">Progress</span>
            </Button>
          </Link>
          
          {isAdmin && (
            <>
              <Link href="/dashboard/teacher/upload">
                <Button variant="ghost" size="sm" className="font-bold text-emerald-600 gap-2 rounded-xl bg-emerald-50 hover:bg-emerald-100">
                  <Upload className="h-4 w-4" /> <span className="hidden sm:inline">Admin Upload</span>
                </Button>
              </Link>
              <Link href="/dashboard/admin/analytics">
                <Button variant="ghost" size="sm" className="font-bold text-purple-600 gap-2 rounded-xl bg-purple-50 hover:bg-purple-100">
                  <Shield className="h-4 w-4" /> <span className="hidden sm:inline">Reports</span>
                </Button>
              </Link>
            </>
          )}

          <div className="w-px h-6 bg-border mx-2 hidden sm:block"></div>
          
          <span className="text-sm font-bold text-muted-foreground hidden md:inline truncate max-w-[120px]">
            {session?.user?.phone}
          </span>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button variant="outline" size="sm" className="rounded-xl font-bold gap-2">
              <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </form>
        </div>
      </header>
      <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
        {children}
      </main>
    </div>
  );
}
