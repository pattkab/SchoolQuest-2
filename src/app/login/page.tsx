import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 bg-background">
      <Link href="/" className="absolute top-4 left-4 sm:top-8 sm:left-8 text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
        <ArrowLeft className="h-5 w-5" />
        <span className="font-bold hidden sm:inline">Back to Home</span>
      </Link>
      
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-primary text-white p-4 rounded-2xl shadow-sm">
            <GraduationCap className="h-10 w-10" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-foreground tracking-tight">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">Enter your mobile money number to sign in or start your 3-day free trial.</p>
          </div>
        </div>
        
        <Card className="rounded-3xl shadow-lg border-0 bg-white">
          <CardContent className="pt-8">
            <form
              action={async (formData) => {
                "use server";
                await signIn("credentials", formData);
              }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-sm font-bold text-foreground">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="0770000000"
                  required
                  className="text-lg py-7 px-5 rounded-2xl bg-gray-50 border-gray-200 focus-visible:ring-primary focus-visible:ring-offset-2"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-bold text-foreground">Password / PIN</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="text-lg py-7 px-5 rounded-2xl bg-gray-50 border-gray-200 focus-visible:ring-primary focus-visible:ring-offset-2"
                />
              </div>
              <Button type="submit" className="w-full py-7 text-lg font-bold rounded-2xl shadow-md hover:shadow-lg transition-shadow mt-4">
                Continue
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
