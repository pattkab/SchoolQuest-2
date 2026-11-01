import assert from "node:assert/strict";
import test from "node:test";
import bcrypt from "bcryptjs";
import { passwordMatches } from "../src/lib/password";
import { assertPublicHttpsUrl, isPrivateAddress } from "../src/lib/safe-url";

test("an account with no password hash rejects every password", () => {
  assert.equal(passwordMatches(null, "1234"), false);
  assert.equal(passwordMatches(undefined, "anything"), false);
  assert.equal(passwordMatches("", "1234"), false);
});

test("a stored hash accepts only the matching password", () => {
  const hash = bcrypt.hashSync("1234", 4);
  assert.equal(passwordMatches(hash, "1234"), true);
  assert.equal(passwordMatches(hash, "9999"), false);
});

test("document links must be public https addresses", () => {
  assert.equal(assertPublicHttpsUrl("https://raw.githubusercontent.com/pattkab/SchoolQuest-2/main/README.md").protocol, "https:");
  assert.throws(() => assertPublicHttpsUrl("http://example.com/paper.pdf"), /https/);
  assert.throws(() => assertPublicHttpsUrl("https://127.0.0.1/secret"), /not allowed/);
  assert.throws(() => assertPublicHttpsUrl("https://169.254.169.254/latest"), /not allowed/);
  assert.throws(() => assertPublicHttpsUrl("https://metadata.google.internal/"), /not allowed/);
});

test("private network addresses are rejected", () => {
  for (const address of ["10.1.2.3", "192.168.1.20", "172.16.0.4", "127.0.0.1", "::1", "fd00::1"]) {
    assert.equal(isPrivateAddress(address), true, address);
  }
  assert.equal(isPrivateAddress("8.8.8.8"), false);
});
