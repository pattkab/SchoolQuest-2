import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, GraduationCap, ChevronRight, PenTool } from "lucide-react";
import * as motion from "framer-motion/client";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <header className="px-6 py-4 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-50 border-b">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-white p-2 rounded-xl">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-black text-foreground tracking-tight">School Quest</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="font-bold text-base hidden sm:inline-flex">
              Sign In
            </Button>
          </Link>
          <Link href="/login">
            <Button className="font-bold rounded-full px-6 shadow-sm hover:shadow-md transition-all">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center text-center px-4 pt-16 pb-24 max-w-4xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <span className="inline-block bg-primary/10 text-primary font-bold px-4 py-1.5 rounded-full text-sm mb-2">
            Built for the Ugandan Curriculum 🇺🇬
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-foreground leading-[1.1] tracking-tight">
            Master your exams with <span className="text-primary block sm:inline">confidence.</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The easiest way for Nursery to University students to practice real past papers, draw answers, and get instant AI grading.
          </p>
          
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all gap-2">
                Start Practicing Now <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full"
        >
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-border/50 text-left hover:shadow-md transition-shadow">
            <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <BookOpen className="h-7 w-7 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-3">All Past Papers</h3>
            <p className="text-muted-foreground leading-relaxed">
              Access hundreds of digitized papers from P1 to A-Level. Clean, readable, and structured for your phone.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-border/50 text-left hover:shadow-md transition-shadow">
            <div className="bg-green-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <CheckCircle className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant AI Grading</h3>
            <p className="text-muted-foreground leading-relaxed">
              Submit your answers and get immediate feedback. Our AI understands your typed answers and guides your learning.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-border/50 text-left hover:shadow-md transition-shadow">
            <div className="bg-amber-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <PenTool className="h-7 w-7 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-3">Interactive Canvas</h3>
            <p className="text-muted-foreground leading-relaxed">
              Drawing questions are no longer a problem. Use your touch screen to draw shapes and diagrams right in the app.
            </p>
          </div>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t py-8 text-center text-muted-foreground">
        <p className="font-medium">© {new Date().getFullYear()} School Quest Uganda. All rights reserved.</p>
      </footer>
    </div>
  );
}
