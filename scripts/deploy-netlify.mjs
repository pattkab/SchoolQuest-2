import { execFileSync, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const [mode = "preview", ...extra] = process.argv.slice(2);
if (!["preview", "production"].includes(mode) || extra.length) {
  console.error("Use npm run deploy:preview or npm run deploy:production without extra arguments.");
  process.exit(1);
}

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const revision = git("rev-parse", "HEAD");
if (mode === "production" && process.env.SCHOOLQUEST_RELEASE_COMMIT !== revision) {
  console.error("Production requires SCHOOLQUEST_RELEASE_COMMIT to match the full SHA of the reviewed preview.");
  process.exit(1);
}

const site = process.env.NETLIFY_SITE_ID;
if (!site || !/^[a-z0-9-]+$/i.test(site)) {
  console.error("Set NETLIFY_SITE_ID to the School Quest Netlify project ID.");
  process.exit(1);
}

if (git("status", "--porcelain") || [".env", ".env.local", ".env.production", ".env.production.local"].some(existsSync)) {
  console.error("Deploy from a clean checkout with no local production environment files.");
  process.exit(1);
}

const args = mode === "production"
  ? ["deploy", "--site", site, "--context", "production", "--prod"]
  : ["deploy", "--site", site, "--context", "deploy-preview"];
const result = spawnSync("netlify", [...args, "--message", `School Quest ${mode} ${revision}`], { stdio: "inherit" });
if (result.error) console.error("Could not run Netlify CLI. Install it and sign in first.");
process.exitCode = result.status ?? 1;
