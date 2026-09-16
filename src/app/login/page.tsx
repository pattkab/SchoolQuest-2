import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, Phone, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import * as motion from "framer-motion/client";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full bg-background overflow-hidden">
      {/* Back Button */}
      <Link href="/" className="absolute top-4 left-4 sm:top-8 sm:left-8 text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 z-50 bg-white/85 backdrop-blur-sm px-4 py-2 rounded-full border shadow-sm">
        <ArrowLeft className="h-5 w-5" />
        <span className="font-bold">Back</span>
      </Link>

      <div className="flex w-full">
        {/* Left Pane: Gorgeous illustration & photo of smiling students in uniform (Desktop only) */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-center justify-center p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary/90 to-primary/40 z-10" />
          
          {/* Background Stock Photo */}
          <img
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80"
            alt="Ugandan Primary Students in Uniform"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />

          <div className="relative z-20 space-y-6 text-white text-left max-w-lg">
            <span className="inline-flex items-center gap-1 bg-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> Empowering Learners
            </span>
            <h2 className="text-5xl font-black leading-tight">Your gateway to academic success.</h2>
            <p className="text-white/80 text-lg leading-relaxed font-medium">
              Join thousands of students across Uganda who practice with real past papers, receive instant marking, and ace their UNEB examinations.
            </p>
          </div>
        </div>

        {/* Right Pane: Login Form (Mobile/Tablet and Desktop) */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 sm:p-8 bg-background">
          <div className="w-full max-w-md space-y-8 animate-in fade-in duration-500">
            
            {/* Mobile Header Image showing students in uniform */}
            <div className="lg:hidden w-full h-40 rounded-3xl overflow-hidden relative shadow-md">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80"
                alt="Ugandan Students in Uniform"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 z-20 text-white text-left">
                <h2 className="text-2xl font-black">School Quest</h2>
                <p className="text-white/85 text-xs font-medium">Your study companion</p>
              </div>
            </div>

            <div className="text-center space-y-2 hidden lg:block">
              <div className="bg-primary text-white p-4 rounded-3xl shadow-sm inline-block">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">Welcome Back</h1>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Sign in with your phone number or activate your free trial instantly.
              </p>
            </div>

            <Card className="rounded-[2rem] shadow-xl border-0 bg-white">
              <CardContent className="pt-8 px-6 sm:px-8">
                <form
                  action={async (formData) => {
                    "use server";
                    await signIn("credentials", formData);
                  }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-sm font-bold text-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" /> Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="e.g. 0772123456"
                      required
                      className="text-lg py-7 px-5 rounded-2xl bg-gray-50 border-gray-200 focus-visible:ring-primary focus-visible:ring-offset-2"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-sm font-bold text-foreground flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" /> Password or PIN
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="text-lg py-7 px-5 rounded-2xl bg-gray-50 border-gray-200 focus-visible:ring-primary focus-visible:ring-offset-2"
                    />
                  </div>

                  <Button type="submit" className="w-full py-7 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/95 text-white mt-4">
                    Sign In / Register
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                By continuing, you agree to our 3-day Trial Policy. Direct support is available at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
