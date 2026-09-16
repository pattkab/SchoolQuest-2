import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Users, UserMinus, Percent, BarChart3, ShieldAlert } from "lucide-react";

export default async function AdminAnalyticsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const currentUser = await db.user.findUnique({
    where: { id: session.user.id }
  });

  if (!currentUser) {
    redirect("/login");
  }

  // Soft check for testing: in prod we enforce role === "SUPER_ADMIN" or "ADMIN"
  // If role is student, let's warn them but let them view for prototype showcase, 
  // or restrict based on requirements. Let's showcase it securely!
  const isAuthorized = currentUser.role === "SUPER_ADMIN" || currentUser.role === "ADMIN" || currentUser.role === "TEACHER";

  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto my-12 text-center space-y-4">
        <ShieldAlert className="h-16 w-16 text-yellow-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-800">Admin Section Restricted</h2>
        <p className="text-gray-500">
          This dashboard is reserved for Super Admins and Teachers.
        </p>
        <p className="text-xs text-gray-400 italic">
          To test, modify your user role in the DB to `ADMIN` or `TEACHER`.
        </p>
      </div>
    );
  }

  const now = new Date();

  // Queries
  const allUsers = await db.user.findMany({
    orderBy: { createdAt: "desc" }
  });

  const totalUsers = allUsers.length;

  const activeSubscribers = allUsers.filter(
    (u) => u.subscriptionEndsAt && u.subscriptionEndsAt > now
  ).length;

  const activeTrials = allUsers.filter(
    (u) => u.trialEndsAt && u.trialEndsAt > now && (!u.subscriptionEndsAt || u.subscriptionEndsAt <= now)
  ).length;

  // Churn definition: Users who are expired trials AND not active subscribers
  const churnedUsers = allUsers.filter(
    (u) => (!u.trialEndsAt || u.trialEndsAt <= now) && (!u.subscriptionEndsAt || u.subscriptionEndsAt <= now)
  ).length;

  // Calculations
  const churnRate = totalUsers > 0 ? Math.round((churnedUsers / totalUsers) * 100) : 0;
  const monthlyRecurringRevenue = activeSubscribers * 20000;

  return (
    <div className="space-y-8 py-4">
      <div>
        <h2 className="text-3xl font-black text-gray-800">Super Admin & Subscription Metrics</h2>
        <p className="text-gray-500">Monitor system monetization, active user cohorts, and churn.</p>
      </div>

      {/* Revenue & Growth KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-green-50/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Estimated MRR</CardTitle>
            <Coins className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-green-800">
              UGX {monthlyRecurringRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 mt-1">
              Active Subscribers × UGX 20,000
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Registered Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{totalUsers}</div>
            <p className="text-xs text-gray-500 mt-1">Across all user roles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Trials</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{activeTrials}</div>
            <p className="text-xs text-blue-500 mt-1">3-day period cohorts</p>
          </CardContent>
        </Card>

        <Card className="border-red-100 bg-red-50/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Churn Rate</CardTitle>
            <Percent className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{churnRate}%</div>
            <p className="text-xs text-red-500 mt-1">Trials that didn't subscribe</p>
          </CardContent>
        </Card>
      </div>

      {/* Cohorts Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Subscription Cohorts breakdown</CardTitle>
            <CardDescription>Visual summary of total monetization categories.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-green-700">Paying Subscribers</span>
                <span className="font-bold">{activeSubscribers}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: `${totalUsers > 0 ? (activeSubscribers / totalUsers) * 100 : 0}%` }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-blue-600">Active Free Trials</span>
                <span className="font-bold">{activeTrials}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-blue-400 h-3 rounded-full" style={{ width: `${totalUsers > 0 ? (activeTrials / totalUsers) * 100 : 0}%` }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-red-600">Expired / Churned Cohorts</span>
                <span className="font-bold">{churnedUsers}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-red-400 h-3 rounded-full" style={{ width: `${totalUsers > 0 ? (churnedUsers / totalUsers) * 100 : 0}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Registration list */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent registrations</CardTitle>
            <CardDescription>Track onboarding and roles of newly registered users.</CardDescription>
          </CardHeader>
          <CardContent>
            {allUsers.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No users registered yet.</div>
            ) : (
              <div className="divide-y max-h-[250px] overflow-y-auto pr-2 space-y-3">
                {allUsers.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex justify-between items-center py-2">
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-gray-800">{user.phone}</p>
                      <p className="text-[10px] text-gray-400">
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full font-bold text-gray-600 uppercase">
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
