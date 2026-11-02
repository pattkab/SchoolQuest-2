import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";
import { storeNoticeDecision } from "../src/lib/billing";
import { redactOps, reportOps } from "../src/lib/ops-log";
import { rateLimit, resetRateLimits } from "../src/lib/rate-limit";
import { seedBlockedReason } from "../src/lib/release-guard";

test("ops log drops examination answers and secrets", () => {
  const line = reportOps("exam.save_failed", { answer: "24 apples", password: "hidden", action: "submit" });
  assert.match(line, /exam\.save_failed/);
  assert.match(line, /submit/);
  assert.equal(line.includes("24 apples"), false);
  assert.equal(line.includes("hidden"), false);
  assert.equal("password" in redactOps({ password: "hidden", action: "submit" }), false);
});

test("seed refuses staging and production", () => {
  const previousEnv = process.env.SCHOOLQUEST_ENV;
  const previousNetlify = process.env.NETLIFY;
  process.env.SCHOOLQUEST_ENV = "production";
  delete process.env.NETLIFY;
  assert.match(seedBlockedReason() || "", /production/);
  process.env.SCHOOLQUEST_ENV = "staging";
  assert.match(seedBlockedReason() || "", /staging/);
  delete process.env.SCHOOLQUEST_ENV;
  process.env.NETLIFY = "true";
  assert.match(seedBlockedReason() || "", /production/);
  if (previousEnv === undefined) delete process.env.SCHOOLQUEST_ENV;
  else process.env.SCHOOLQUEST_ENV = previousEnv;
  if (previousNetlify === undefined) delete process.env.NETLIFY;
  else process.env.NETLIFY = previousNetlify;
  assert.equal(seedBlockedReason(), null);
});

test("a burst of sign-in attempts is limited", () => {
  resetRateLimits();
  assert.equal(rateLimit("login:test", 2, 1000, 0).ok, true);
  assert.equal(rateLimit("login:test", 2, 1000, 10).ok, true);
  assert.equal(rateLimit("login:test", 2, 1000, 20).ok, false);
  assert.equal(rateLimit("login:test", 2, 1000, 2000).ok, true);
});

test("an unverified store notice cannot change access", () => {
  assert.equal(storeNoticeDecision("REFUND", false), "deny");
  assert.equal(storeNoticeDecision("EXPIRED", false), "deny");
  assert.equal(storeNoticeDecision("DID_RENEW", true), "renew");
  assert.equal(storeNoticeDecision("SUBSCRIBED", true), "renew");
});

test("tracked files do not contain private keys or cloud key ids", () => {
  let output = "";
  try {
    output = execFileSync("git", ["grep", "-I", "-n", "-E", "BEGIN (RSA |OPENSSH |EC )?PRIVATE KEY|AKIA[0-9A-Z]{16}"], { encoding: "utf8" });
  } catch (error) {
    const failure = error as { status?: number; stdout?: string };
    if (failure.status === 1) return;
    output = String(failure.stdout || "");
  }
  assert.equal(output.trim(), "");
});
