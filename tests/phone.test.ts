import assert from "node:assert/strict";
import test from "node:test";
import { accountFromFirebaseToken } from "../src/lib/firebase-account";
import { canonicalPhone, phoneKeys } from "../src/lib/phone";

test("a Ugandan phone matches the local and international forms", () => {
  const keys = phoneKeys("0700 123 456");
  assert.ok(keys.includes("0700123456"));
  assert.ok(keys.includes("256700123456"));
  assert.ok(phoneKeys("+256700123456").includes("0700123456"));
  assert.equal(canonicalPhone("256700123456"), "0700123456");
});

test("a Google token without a signature is rejected", async () => {
  assert.equal(await accountFromFirebaseToken("not-a-token"), null);
});
