"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Sparkles, ShieldCheck, Loader2 } from "lucide-react";
import { processMoMoPayment } from "./actions";

interface SubscribeClientProps {
  userPhone: string;
}

export default function SubscribeClient({ userPhone }: SubscribeClientProps) {
  const [selectedPlan, setSelectedPlan] = useState<"weekly" | "monthly" | "term">("monthly");
  const [phone, setPhone] = useState(userPhone);
  const [provider, setProvider] = useState<"MTN" | "AIRTEL">("MTN");
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: "weekly" as const,
      name: "Weekly revision",
      price: 5000,
      period: "7 days",
      badge: "Quick revision",
      badgeColor: "bg-blue-100 text-blue-800",
      features: ["All Nursery - Uni Papers", "Instant Grading", "Drawing Canvas"],
    },
    {
      id: "monthly" as const,
      name: "Standard monthly",
      price: 20000,
      period: "30 days",
      badge: "Most Popular",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200 border",
      features: [
        "All Nursery - Uni Papers",
        "Instant Grading",
        "Drawing Canvas",
        "Progress Analytics Dashboard",
        "UNEB Badges & Streaks",
      ],
    },
    {
      id: "term" as const,
      name: "Boarding Term Pass",
      price: 50000,
      period: "90 days (Full Term)",
      badge: "Best Value (Save UGX 10k)",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200 border",
      features: [
        "All Nursery - Uni Papers",
        "Instant Grading",
        "Drawing Canvas",
        "Progress Analytics Dashboard",
        "UNEB Badges & Streaks",
        "Priority Support",
      ],
    },
  ];

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return alert("Please enter your Mobile Money number.");
    setLoading(true);
    try {
      await processMoMoPayment(phone, provider, selectedPlan);
    } catch (err: any) {
      alert(err.message || "Something went wrong processing your payment.");
    } finally {
      setLoading(false);
    }
  };

  const currentPlanDetails = plans.find((p) => p.id === selectedPlan);

  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto text-left">
      {/* Expired warning Banner */}
      <Card className="border-red-200 bg-red-50/50 rounded-3xl p-5">
        <CardContent className="p-0 flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-700 rounded-2xl hidden sm:block">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-red-800 font-extrabold text-lg">
              Your Free Trial has expired!
            </p>
            <p className="text-sm text-red-700 font-medium mt-0.5">
              Secure unlimited access to real past papers and AI evaluation by selecting a MoMo study package below.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Plan Cards Grid */}
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">Select Study Package</h3>
          <p className="text-gray-500 text-sm mt-0.5">Cancel or modify your package at any time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p) => {
            const isSelected = selectedPlan === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPlan(p.id)}
                className={`w-full text-left rounded-[2rem] border-2 transition-all p-6 relative flex flex-col justify-between h-full bg-white group active:scale-[0.98] ${
                  isSelected
                    ? "border-primary ring-2 ring-primary/20 shadow-lg"
                    : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                }`}
              >
                {/* Badge if present */}
                <div className="absolute top-4 right-4">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                </div>

                <div className="space-y-6 flex-1">
                  <div className="space-y-1">
                    <span className="text-sm font-black text-muted-foreground uppercase tracking-wider">
                      {p.name}
                    </span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-3xl font-black text-gray-900">UGX {p.price.toLocaleString()}</span>
                      <span className="text-xs font-semibold text-gray-400"> / {p.period}</span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-100" />

                  {/* Features */}
                  <ul className="space-y-3">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 font-medium">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Radio Circle */}
                <div className="mt-8 flex items-center justify-between w-full">
                  <span className={`text-xs font-black ${isSelected ? "text-primary" : "text-gray-400"}`}>
                    {isSelected ? "Selected" : "Tap to Select"}
                  </span>
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? "border-primary bg-primary" : "border-gray-200"
                  }`}>
                    {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Payment Form */}
      <Card className="rounded-[2.5rem] border-0 shadow-xl bg-white p-6 sm:p-8 max-w-xl mx-auto">
        <CardContent className="p-0 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-black text-primary uppercase tracking-wider flex items-center justify-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> SECURE MOBILE MONEY CHECKOUT
            </span>
            <h4 className="text-xl font-black text-gray-900">Pay via MTN MoMo / Airtel Money</h4>
            <p className="text-xs text-gray-400">Funds are charged directly and subscription is credited instantly.</p>
          </div>

          <form onSubmit={handlePay} className="space-y-6">
            {/* Phone input */}
            <div className="space-y-3">
              <Label htmlFor="checkout-phone" className="text-sm font-bold text-gray-800">Mobile Money Number</Label>
              <Input
                id="checkout-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0772123456"
                required
                className="py-7 px-5 rounded-2xl bg-gray-50 border-gray-200 text-lg focus-visible:ring-primary focus-visible:ring-offset-2 font-bold"
              />
            </div>

            {/* Provider Selector */}
            <div className="space-y-3">
              <Label className="text-sm font-bold text-gray-800">Select Provider</Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setProvider("MTN")}
                  className={`flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer hover:bg-yellow-50/50 transition-all font-bold ${
                    provider === "MTN" ? "border-yellow-400 bg-yellow-50/20" : "border-gray-100 bg-white"
                  }`}
                >
                  <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                    provider === "MTN" ? "border-yellow-400 bg-yellow-400" : "border-gray-300"
                  }`}>
                    {provider === "MTN" && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-yellow-700 text-base font-black">MTN MoMo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setProvider("AIRTEL")}
                  className={`flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer hover:bg-red-50/50 transition-all font-bold ${
                    provider === "AIRTEL" ? "border-red-500 bg-red-50/20" : "border-gray-100 bg-white"
                  }`}
                >
                  <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                    provider === "AIRTEL" ? "border-red-500 bg-red-500" : "border-gray-300"
                  }`}>
                    {provider === "AIRTEL" && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-red-600 text-base font-black">Airtel Money</span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-7 text-lg font-black rounded-2xl shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/95 text-white gap-2 mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Authorizing via Telecom...
                </>
              ) : (
                `Pay UGX ${currentPlanDetails?.price.toLocaleString()} via ${provider === "MTN" ? "MTN MoMo" : "Airtel Money"}`
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
