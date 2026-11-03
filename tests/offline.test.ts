import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { isPrivatePath, mayCachePath, SHELL_PATHS } from "../src/lib/offline-policy";
import { canOpenOfflinePack, canSyncOfflinePack, offlineExpiry, signOfflinePass } from "../src/lib/offline-pass";
import { toPublicQuestion } from "../src/lib/public-question";
import { shouldFetchLibrary } from "../src/lib/library-query";

test("the app shell cache never stores private pages", () => {
  assert.equal(isPrivatePath("/dashboard"), true);
  assert.equal(isPrivatePath("/dashboard/papers/1"), true);
  assert.equal(isPrivatePath("/api/auth"), true);
  assert.equal(isPrivatePath("/login"), true);
  assert.equal(mayCachePath("/dashboard"), false);
  assert.equal(mayCachePath("/offline.html", "POST"), false);
  assert.equal(mayCachePath("/offline.html"), true);
  assert.equal(mayCachePath("/icon-512.png"), false);
  const worker = readFileSync(new URL("../public/sw.js", import.meta.url), "utf8");
  for (const path of ["/dashboard", "/api", "/login"]) assert.equal(worker.includes(path), true);
  for (const path of SHELL_PATHS) assert.equal(worker.includes(path), true);
  assert.equal(worker.includes("cache.put"), false);
});

test("an offline pass expires and a changed date does not sync", () => {
  const now = new Date("2026-11-02T09:00:00.000Z");
  const pass = signOfflinePass({ userId: "learner", paperId: "paper", version: "v1", expiresAt: offlineExpiry(now, 1).toISOString() }, "test-secret");
  assert.equal(canOpenOfflinePack(pass, now), true);
  assert.equal(canOpenOfflinePack(pass, new Date("2026-11-02T11:00:00.000Z")), false);
  assert.equal(canSyncOfflinePack(pass, "test-secret"), true);
  assert.equal(canSyncOfflinePack({ ...pass, expiresAt: "2026-12-01T00:00:00.000Z" }, "test-secret"), false);
});

test("a downloaded paper does not include marking secrets", () => {
  const secret = "the accepted label";
  const question = toPublicQuestion({
    id: "q",
    type: "DIAGRAM_LABEL",
    prompt: "Label the heart",
    options: null,
    correctAnswer: JSON.stringify({ labels: [{ id: "a", x: 0.2, y: 0.4, prompt: "A", accept: [secret] }] }),
    points: 1,
  });
  assert.equal(JSON.stringify(question).includes(secret), false);
  assert.equal("correctAnswer" in question, false);
  assert.deepEqual(question.labelTargets, [{ id: "a", x: 0.2, y: 0.4, prompt: "A" }]);
});

test("the library does not download feeds before a type or subject is chosen", () => {
  assert.equal(shouldFetchLibrary({}), false);
  assert.equal(shouldFetchLibrary({ kind: "PAST_PAPER" }), true);
  assert.equal(shouldFetchLibrary({ subjectKeys: ["MTC"] }), true);
  const source = readFileSync(new URL("../src/lib/fresh-teacher.ts", import.meta.url), "utf8");
  assert.equal(source.includes("if (!shouldFetchLibrary(options)) return [];"), true);
});
