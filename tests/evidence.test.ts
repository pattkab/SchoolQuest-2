import assert from "node:assert/strict";
import test from "node:test";
import { pairedOutcomes, verifiedReceipts, entitlementAllowed, cohortChange } from "../src/lib/evidence";
import { readinessRows } from "../src/lib/readiness";

const real = {
  userId: "learner",
  subjectId: "maths",
  accountKind: "REAL",
  completedAt: "2026-03-01T00:00:00.000Z",
  score: 4,
  maxScore: 10,
};

test("percentage-point change uses a completed baseline and a later endline", () => {
  const { pairs } = pairedOutcomes([
    { ...real, mode: "BASELINE", score: 4, maxScore: 10, completedAt: "2026-03-01T00:00:00.000Z" },
    { ...real, mode: "ENDLINE", score: 7, maxScore: 10, completedAt: "2026-04-01T00:00:00.000Z" },
  ]);
  assert.equal(pairs.length, 1);
  assert.equal(pairs[0].baselinePct, 40);
  assert.equal(pairs[0].endlinePct, 70);
  assert.equal(pairs[0].changePoints, 30);
  assert.equal(cohortChange(pairs)?.changePoints, 30);
});

test("incomplete, demo, and reversed attempts are not treated as zero", () => {
  const { pairs } = pairedOutcomes([
    { ...real, mode: "BASELINE", score: null, completedAt: null },
    { ...real, mode: "ENDLINE", accountKind: "DEMO", score: 10 },
    { ...real, mode: "ENDLINE", completedAt: "2026-01-01T00:00:00.000Z", score: 1 },
    { ...real, mode: "PRACTICE", score: 0 },
  ]);
  assert.equal(pairs.length, 0);
  assert.equal(cohortChange(pairs), null);
});

test("verified revenue ignores demo, duplicate, and unverified payments", () => {
  const result = verifiedReceipts([
    { userId: "a", providerRef: "yo-1", status: "VERIFIED", amount: 25000, accountKind: "REAL" },
    { userId: "a", providerRef: "yo-1", status: "VERIFIED", amount: 25000, accountKind: "REAL" },
    { userId: "b", providerRef: null, status: "VERIFIED", amount: 50000, accountKind: "REAL" },
    { userId: "c", providerRef: "demo", status: "VERIFIED", amount: 25000, accountKind: "DEMO" },
    { userId: "d", providerRef: "yo-2", status: "PENDING", amount: 25000, accountKind: "REAL" },
  ]);
  assert.deepEqual(result, { receipts: 1, customers: 1, grossUgx: 25000, measured: true });
});

test("an empty record does not invent revenue, users, or an endorsement", () => {
  const rows = readinessRows({ realUsers: 0, activeLearners: 0, receipts: 0, grossUgx: 0, pairs: 0, updated: "2026-11-01" });
  assert.equal(rows.find((row) => row.domain === "Revenue")?.evidence, "Not yet measured.");
  assert.equal(rows.find((row) => row.domain === "Verified users")?.status, "MISSING");
  assert.equal(rows.some((row) => row.status === "VERIFIED"), false);
});

test("a click or a mismatched amount cannot unlock a subscription", () => {
  assert.equal(entitlementAllowed({ status: "PENDING", providerRef: "yo-1", amount: 25000 }, 25000), false);
  assert.equal(entitlementAllowed({ status: "VERIFIED", providerRef: null, amount: 25000 }, 25000), false);
  assert.equal(entitlementAllowed({ status: "VERIFIED", providerRef: "yo-1", amount: 1000 }, 25000), false);
  assert.equal(entitlementAllowed({ status: "VERIFIED", providerRef: "yo-1", amount: 25000 }, 25000), true);
});
