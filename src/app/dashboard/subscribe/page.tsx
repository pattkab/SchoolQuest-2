import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { processMoMoPayment } from "./actions";

export default async function SubscribePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) {
    redirect("/login");
  }

  const now = new Date();
  const hasActiveTrial = user.trialEndsAt && user.trialEndsAt > now;
  const hasActiveSubscription = user.subscriptionEndsAt && user.subscriptionEndsAt > now;

  // If already active, send back to dashboard
  if (hasActiveTrial || hasActiveSubscription) {
    redirect("/dashboard");
  }

  const userPhone = user.phone || "";

  return (
    <div className="max-w-md mx-auto my-8 space-y-6">
      <Card className="border-red-200 bg-red-50/50">
        <CardContent className="pt-6">
          <p className="text-red-700 font-semibold text-center">
            Your 3-day free trial has expired!
          </p>
          <p className="text-sm text-red-600 text-center mt-1">
            Subscribe now to keep practicing and grading your papers.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Monthly Subscription</CardTitle>
          <CardDescription>
            Unlock unlimited access to Nursery - University Ugandan past papers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <span className="text-3xl font-extrabold">UGX 20,000</span>
            <span className="text-gray-500 text-sm"> / month</span>
          </div>

          <form
            action={async (formData) => {
              "use server";
              const phone = formData.get("phone") as string;
              const provider = formData.get("provider") as "MTN" | "AIRTEL";
              await processMoMoPayment(phone, provider);
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="phone">Mobile Money Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={userPhone}
                placeholder="0770000000"
                required
                className="py-6 text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label>Select Provider</Label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-yellow-50/50 border-yellow-200">
                  <input
                    type="radio"
                    name="provider"
                    value="MTN"
                    defaultChecked
                    className="h-5 w-5 accent-yellow-500"
                  />
                  <span className="font-bold text-yellow-700">MTN MoMo</span>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-red-50/50 border-red-200">
                  <input
                    type="radio"
                    name="provider"
                    value="AIRTEL"
                    className="h-5 w-5 accent-red-600"
                  />
                  <span className="font-bold text-red-600">Airtel Money</span>
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full py-6 text-lg font-bold">
              Pay UGX 20,000
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
