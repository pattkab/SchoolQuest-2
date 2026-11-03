import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { rejectClientBilling } from "../src/lib/mobile-api";
import { hashMobileToken } from "../src/lib/mobile-session";
import { registerStudentAccount } from "../src/lib/student-account";

test("a phone cannot start a subscription by itself", () => {
  const result = rejectClientBilling();
  assert.equal(result.ok, false);
  assert.match(result.error, /server/i);
});

test("a mobile session token is stored as a hash", () => {
  const hash = hashMobileToken("schoolquest-token");
  assert.notEqual(hash, "schoolquest-token");
  assert.equal(hash, hashMobileToken("schoolquest-token"));
});

test("student registration rejects an incomplete form before creating an account", async () => {
  const result = await registerStudentAccount({
    phone: "",
    password: "1234",
    name: "",
    classGradeId: "",
    sex: "",
    guardianName: "",
    guardianPhone: "",
    dateOfBirth: "",
    emisSchoolId: "",
  });
  assert.equal("error" in result && result.error, "missing");
});

test("the Flutter production client uses the live site and not a local server", () => {
  const config = readFileSync(new URL("../flutter/lib/config/app_config.dart", import.meta.url), "utf8");
  const gradle = readFileSync(new URL("../flutter/android/app/build.gradle.kts", import.meta.url), "utf8");
  assert.match(config, /https:\/\/schoolquestweb\.netlify\.app/);
  assert.match(gradle, /com\.schoolquest\.app/);
  assert.equal(gradle.includes("applicationIdSuffix"), false);
  assert.equal(config.includes("http://localhost"), false);
  assert.equal(config.includes("http://10.0.2.2"), false);
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

test("a mobile session expires and logout rejects the same token", async () => {
  const db = await database();
  if (!db) return;
  const { openMobileSession, revokeMobileToken, userForMobileToken } = await import("../src/lib/mobile-session");
  const { mobilePaper } = await import("../src/lib/mobile-api");
  const user = await db.user.create({ data: { role: "STUDENT", name: "Mobile session test", accountKind: "TEST", email: `mobile-${Date.now()}@example.com` } });
  let paperId: string | null = null;
  try {
    const opened = await openMobileSession(user.id);
    assert.equal((await userForMobileToken(opened.token))?.id, user.id);
    await revokeMobileToken(opened.token);
    assert.equal(await userForMobileToken(opened.token), null);
    const expired = await openMobileSession(user.id);
    await db.mobileSession.update({ where: { tokenHash: hashMobileToken(expired.token) }, data: { expiresAt: new Date(Date.now() - 1000) } });
    assert.equal(await userForMobileToken(expired.token), null);

    const subject = await db.subject.findFirst();
    assert.ok(subject);
    const paper = await db.paper.create({
      data: {
        title: "Mobile paper test",
        subjectId: subject.id,
        status: "PUBLISHED",
        questions: { create: { type: "SHORT_ANSWER", prompt: "Name the longest river", correctAnswer: JSON.stringify("Nile"), points: 1, order: 1 } },
      },
    });
    paperId = paper.id;
    const payload = JSON.stringify(await mobilePaper(paper.id));
    assert.equal(payload.includes("Nile"), false);
    assert.equal(payload.includes("correctAnswer"), false);
  } finally {
    if (paperId) await db.paper.delete({ where: { id: paperId } }).catch(() => undefined);
    await db.user.delete({ where: { id: user.id } }).catch(() => undefined);
  }
});
