export const SUBSCRIPTION_PLANS = [
  { code: "weekly", name: "Weekly revision", price: 5000, currency: "UGX", period: "7 days" },
  { code: "monthly", name: "Standard monthly", price: 20000, currency: "UGX", period: "30 days" },
  { code: "term", name: "Boarding Term Pass", price: 50000, currency: "UGX", period: "90 days" },
] as const;

export function subscriptionPlan(code: string) {
  return SUBSCRIPTION_PLANS.find((plan) => plan.code === code) ?? null;
}
