# SchoolQuest repository reconciliation and release controls

## Current source-of-truth rule
GitHub **main** is the intended reviewed release baseline, **not** proof that the Mac checkout is older. User's active local checkout: `/Volumes/XPATT/APPS/schoolquest`; Codex may have uncommitted/unedited newer work. Never run `git reset --hard`, `git clean -fd`, `git push --force`, or automatic `git pull` into a dirty or diverged working tree.

## Verified remote state (1 November 2026)
- Canonical repository: `pattkab/schoolquest`; default `main`, **public**, not branch-protected.
- `main` SHA at review: `934f5b20326f85a3921445ca82fd59f94ecd95b5`.
- Merged PRs #5 (learner/teacher/school dashboards), #6 (student landing image), #7 (store artwork/privacy & deletion links).
- Draft PR #3 `codex/mobile-workflow` contains committed native Android/iOS projects, freemium, store request and payment groundwork; the branch diverged from main (12 ahead / 12 behind). Its latest commit is `db365a3afef4f84c92586648aa6a292f85678d25`. Latest CI pass was for **earlier** SHA `7c040a7614ba0c0ccb038d8170bd2794d194149b`; rerun on current SHA and reconciled base.
- Draft PR #1 `feature/mobile-apps-freemium` has failed CI and is superseded in scope by PR #3; do not merge both blindly.
- The Play Store assets and public policy/deletion links do not imply native store readiness.
- Existing README and native feature branch disagree on advertised Pro pricing (README: UGX 20,000 monthly; branch server action: UGX 25,000 annual). Resolve product decision and receipt verification before commercial release.
- Netlify currently seeds/bundles SQLite at build, not a proven durable production data store. This is a launch blocker for minors' records, learning history, purchases and subscription entitlements.

## Safe local inventory (Mac Terminal)
```bash
cd /Volumes/XPATT/APPS/schoolquest || exit 1
pwd
git remote -v
git status --short --branch
git branch -vv
git fetch origin --prune
git log --oneline --decorate -12
git log --oneline --left-right HEAD...origin/main
git diff --stat
git diff --cached --stat
git ls-files --others --exclude-standard
```
Review outputs and preserve untracked/non-committed work before switching branches. On a dirty tree, first create a named local backup branch/commit after reviewing secrets and generated files; never automatically stash or force-push. If local changes are ahead, publish them on a dedicated feature branch, open a PR, compare with main, and resolve conflicts there. If the local checkout is unrelated to `pattkab/schoolquest`, stop and verify remotes before any synchronization.

## Required GitHub governance
- Treat SchoolQuest commercial code as **private-by-default** after dependency/visibility review, including public forks, linked demo URLs, CI secrets, documentation and third-party access. A change of visibility needs explicit verification of GitHub consequences and a supported administrative action; changing only the README is not protection.
- Protect `main` with PR-only changes, passing CI, at least one appropriate review where a collaborator exists, no force pushes/deletions, and resolved conversations. Repository rulesets may depend on GitHub account plan.
- Pin actions/dependencies where practicable; add dependency/license/security scans, secret scanning and release approval gates.
- Before merging mobile: reviewed Prisma migration with backup, authentication/privacy checks, native billing receipt verification, adult-only physical-goods checkout, and real device tests.
- Require web/native app policies to match actual behavior; update privacy policy before collecting new data.
