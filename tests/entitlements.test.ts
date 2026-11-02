import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { appleNoticeEffect, clientReportedSuccess, yoAuthorized, yoSignature } from "../src/lib/billing";
import { entitlementActive } from "../src/lib/entitlements";

test("a phone saying payment succeeded does not grant access", () => {
  assert.equal(clientReportedSuccess().ok, false);
});

test("a payment notice needs the server signature", () => {
  const body = "{\"status\":\"SUCCEEDED\"}";
  assert.equal(yoAuthorized("", body, yoSignature("secret", body)), false);
  assert.equal(yoAuthorized("secret", body, "not-the-signature"), false);
  assert.equal(yoAuthorized("secret", body, yoSignature("secret", body)), true);
});

test("store notices renew, expire, or revoke access", () => {
  assert.equal(appleNoticeEffect("DID_RENEW"), "renew");
  assert.equal(appleNoticeEffect("EXPIRED"), "expire");
  assert.equal(appleNoticeEffect("REFUND"), "revoke");
  assert.equal(entitlementActive({ endsAt: new Date(Date.now() - 1000), revokedAt: null, graceHours: 0 }, new Date()), false);
  assert.equal(entitlementActive({ endsAt: new Date(Date.now() - 60 * 60 * 1000), revokedAt: null, graceHours: 24 }, new Date()), true);
  assert.equal(entitlementActive({ endsAt: new Date(Date.now() + 60_000), revokedAt: new Date(), graceHours: 24 }, new Date()), false);
});

async function database() {
  if (!process.env.DATABASE_URL) {
    try {
      const file = readFileSync(new URL("../.env", import.meta.url), "utf8");
      const match = file.match(/^DATABASE_URL=(.*)$/m);
      if (match) process.env.DATABASE_URL = match[1].trim().replace(/^["']|["']$/g, "");
    } catch {
      return null;
    }
  }
  if (!process.env.DATABASE_URL?.startsWith("postgres")) return null;
  return import("../src/lib/db").then((mod) => mod.db);
}

test("one free exam is used at the start, and only a verified payment opens another", async () => {
  const db = await database();
  if (!db) return;
  const { FREE_EXAM_USED, learnerCanOpenExam } = await import("../src/lib/entitlements");
  const { confirmStorePurchase, confirmYoPayment, startPayment, yoSignature } = await import("../src/lib/billing");
  const { openExamAttempt } = await import("../src/lib/exam-attempts");
  const { ensurePlans } = await import("../src/lib/plans");
  const subject = await db.subject.findFirst();
  assert.ok(subject);
  const user = await db.user.create({ data: { role: "STUDENT", name: "Entitlement test", accountKind: "TEST", email: `entitlement-${Date.now()}@example.com`, subscriptionEndsAt: new Date(Date.now() + 86_400_000) } });
  const papers = await Promise.all([1, 2].map((order) => db.paper.create({
    data: { title: `Entitlement paper ${order}`, subjectId: subject.id, status: "PUBLISHED", questions: { create: { type: "SHORT_ANSWER", prompt: "Name the longest river", correctAnswer: JSON.stringify("Nile"), points: 1, order: 1 } } },
  })));
  const previousSecret = process.env.YO_WEBHOOK_SECRET;
  process.env.YO_WEBHOOK_SECRET = "test-webhook-secret";
  try {
    await ensurePlans();
    await db.plan.update({ where: { code: "monthly" }, data: { price: 21000 } });
    const quoted = await startPayment({ userId: user.id, planCode: "monthly", channel: "WEB" });
    assert.equal(quoted.amount, 21000);
    await db.plan.update({ where: { code: "monthly" }, data: { price: 20000 } });
    await assert.rejects(() => startPayment({ userId: user.id, planCode: "monthly", channel: "ANDROID" }), /store/);

    assert.equal((await learnerCanOpenExam(user.id, subject.id)).allowed, true);
    assert.equal(await db.freeExamGrant.count({ where: { userId: user.id } }), 0);
    const first = await openExamAttempt(user.id, papers[0].id);
    const resumed = await openExamAttempt(user.id, papers[0].id);
    assert.equal(resumed.attemptId, first.attemptId);
    assert.equal(await db.freeExamGrant.count({ where: { userId: user.id } }), 1);
    await assert.rejects(() => openExamAttempt(user.id, papers[1].id), new RegExp(FREE_EXAM_USED.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));

    await assert.rejects(() => confirmStorePurchase({
      userId: user.id, source: "PLAY", productId: "schoolquest_premium_monthly", token: "token", verify: async () => null,
    }), /not confirmed/);
    const ends = new Date(Date.now() + 10 * 86_400_000);
    const purchased = await confirmStorePurchase({
      userId: user.id,
      source: "PLAY",
      productId: "schoolquest_premium_monthly",
      token: "token",
      verify: async () => ({ state: "PURCHASED", expiresAt: ends, orderId: "order-1" }),
    });
    assert.equal(purchased.active, true);
    const again = await confirmStorePurchase({
      userId: user.id,
      source: "PLAY",
      productId: "schoolquest_premium_monthly",
      token: "token",
      verify: async () => ({ state: "PURCHASED", expiresAt: ends, orderId: "order-1" }),
    });
    assert.equal(again.created, false);
    assert.equal(again.entitlement?.endsAt.getTime(), purchased.entitlement?.endsAt.getTime());
    const second = await openExamAttempt(user.id, papers[1].id);
    assert.ok(second.attemptId);
    assert.equal(await db.freeExamGrant.count({ where: { userId: user.id } }), 1);

    await confirmStorePurchase({
      userId: user.id,
      source: "PLAY",
      productId: "schoolquest_premium_monthly",
      token: "token",
      verify: async () => ({ state: "REFUNDED", expiresAt: ends, orderId: "order-1" }),
    });
    const thirdPaper = await db.paper.create({
      data: { title: "Entitlement paper 3", subjectId: subject.id, status: "PUBLISHED", questions: { create: { type: "SHORT_ANSWER", prompt: "Name the longest river", correctAnswer: JSON.stringify("Nile"), points: 1, order: 1 } } },
    });
    papers.push(thirdPaper);
    await assert.rejects(() => openExamAttempt(user.id, thirdPaper.id), /subscription/);

    const pending = await startPayment({ userId: user.id, planCode: "monthly", channel: "WEB" });
    const payment = await db.paymentTransaction.findUniqueOrThrow({ where: { id: pending.transactionId } });
    const payload = { idempotencyKey: payment.idempotencyKey, providerRef: "yo-ref-1", status: "SUCCEEDED", amount: payment.amount };
    const rawBody = JSON.stringify(payload);
    await assert.rejects(() => confirmYoPayment({ rawBody, signature: "nope", payload }), /verified/);
    assert.equal(await db.entitlement.count({ where: { userId: user.id, source: "YO", revokedAt: null } }), 0);
    const confirmed = await confirmYoPayment({ rawBody, signature: yoSignature("test-webhook-secret", rawBody), payload });
    const duplicate = await confirmYoPayment({ rawBody, signature: yoSignature("test-webhook-secret", rawBody), payload });
    assert.equal(duplicate.duplicate, true);
    assert.equal(duplicate.entitlement?.endsAt.getTime(), confirmed.entitlement?.endsAt.getTime());

    await db.plan.update({ where: { code: "tablet" }, data: { active: true, price: 10000 } });
    const physical = await startPayment({ userId: user.id, planCode: "tablet", channel: "WEB" });
    const physicalRow = await db.paymentTransaction.findUniqueOrThrow({ where: { id: physical.transactionId } });
    const physicalPayload = { idempotencyKey: physicalRow.idempotencyKey, providerRef: "yo-tablet-1", status: "SUCCEEDED", amount: 10000 };
    const physicalBody = JSON.stringify(physicalPayload);
    const physicalResult = await confirmYoPayment({ rawBody: physicalBody, signature: yoSignature("test-webhook-secret", physicalBody), payload: physicalPayload });
    assert.equal(physicalResult.entitlement, null);
    assert.equal(physicalRow.kind, "PHYSICAL");
  } finally {
    process.env.YO_WEBHOOK_SECRET = previousSecret;
    await db.plan.update({ where: { code: "monthly" }, data: { price: 20000 } }).catch(() => undefined);
    await db.plan.update({ where: { code: "tablet" }, data: { active: false, price: 0 } }).catch(() => undefined);
    for (const paper of papers) await db.paper.delete({ where: { id: paper.id } }).catch(() => undefined);
    await db.user.delete({ where: { id: user.id } }).catch(() => undefined);
  }
});
