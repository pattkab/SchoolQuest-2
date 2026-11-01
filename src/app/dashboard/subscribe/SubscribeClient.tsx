"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ShieldCheck } from "lucide-react";

interface SubscribeClientProps {
  userPhone: string;
}

export default function SubscribeClient({ userPhone: _userPhone }: SubscribeClientProps) {
  const [selectedPlan, setSelectedPlan] = useState<"weekly" | "monthly" | "term">("monthly");

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
              Paid access is not open yet. A trial or a verified payment is required before this screen unlocks practice.
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

      <Card className="rounded-[2.5rem] border bg-white p-6 sm:p-8 max-w-xl mx-auto">
        <CardContent className="p-0 space-y-3 text-center">
          <h4 className="text-xl font-black text-gray-900">Mobile Money is not connected</h4>
          <p className="text-base text-gray-600">
            Choosing {plans.find((plan) => plan.id === selectedPlan)?.name} does not charge a phone or start a subscription.
            Payment will open only after a verified provider confirms the transaction.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
