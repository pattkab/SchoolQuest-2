import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { balance, schoolFor, ugx } from "@/lib/school";
import { addChargeAction, addPaymentAction } from "@/app/actions/school";
import { MoneyField } from "@/components/fields";

export default async function FeesPage() {
  const user = await requireUser();
  if (user.role !== "SCHOOL_ADMIN") redirect("/dashboard/school");
  const school = await schoolFor(user);
  if (!school) redirect("/setup");
  const students = await db.user.findMany({
    where: { schoolId: school.id, role: "STUDENT" },
    include: { feeCharges: true, feePayments: true, classGrade: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl">Fees</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <form action={addChargeAction} className="rounded-3xl border bg-white p-4 space-y-2">
          <p className="font-bold">Add a bill</p>
          <select name="userId" className="w-full h-11 rounded-2xl border px-3">
            {students.map((student) => <option key={student.id} value={student.id}>{student.name}</option>)}
          </select>
          <input name="label" required placeholder="Term 1 fees" className="w-full h-11 rounded-2xl border px-3" />
          <MoneyField name="amount" placeholder="Amount" />
          <button type="submit" className="h-11 rounded-2xl bg-primary px-4 text-white font-bold">Save bill</button>
        </form>
        <form action={addPaymentAction} className="rounded-3xl border bg-white p-4 space-y-2">
          <p className="font-bold">Record a payment</p>
          <select name="userId" className="w-full h-11 rounded-2xl border px-3">
            {students.map((student) => <option key={student.id} value={student.id}>{student.name}</option>)}
          </select>
          <MoneyField name="amount" placeholder="Amount" />
          <input name="note" placeholder="Cash, MoMo…" className="w-full h-11 rounded-2xl border px-3" />
          <button type="submit" className="h-11 rounded-2xl bg-primary px-4 text-white font-bold">Save payment</button>
        </form>
      </div>
      <div className="space-y-2">
        {students.map((student) => {
          const money = balance(student.feeCharges, student.feePayments);
          return (
            <div key={student.id} className="rounded-3xl border bg-white p-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-bold">{student.name}</p>
                <p className="text-sm text-muted-foreground">{student.classGrade?.shortName}</p>
              </div>
              <p className="font-bold">{ugx(money.due)} due</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
