# SchoolQuest mobile + freemium rollout

## Implemented in this branch

- One completed free practice paper per signed-in user **per subject**; server checks both historical completed attempts and a permanent unique entitlement claim.
- A concurrent duplicate submission cannot create a second free claim. The claim and completed attempt are committed together; pre-submit validation does not consume the allowance.
- Expired or unused time-limited trial timestamps no longer control student free access. Pro is currently inferred from `subscriptionEndsAt` (legacy entitlements must be audited before production billing).
- Both exam submission entry points now share the same grading and entitlement enforcement.
- Pro upsell appears on subsequent subject attempts.
- **Legacy simulated mobile-money charging is disabled**. This branch does **not** process real payments or grant new paid entitlements.

## Database rollout

Apply Prisma schema changes safely against a database backup. Do **not** use `db:reset` in production. Add and verify a migration for the new `FreeSubjectClaim` table, and check existing attempts and legacy subscription records before deployment. Existing completed attempts in a subject count as having used that subject's free allowance. Subject IDs are class-specific, so the free allowance currently renews when moving to a different class's subject; decide whether a normalized cross-grade subject family is needed before commercial launch.

## Native Android/iOS project generation (scaffold only)

This is a Next.js server-rendered app. The committed Capacitor config enables **initial native shell scaffolding**, not signed or production-ready apps. The Next.js experience requires a deployed HTTPS endpoint and connectivity for server-backed actions. Native offline packs, deep links, native sign-in, safe-area handling, push notifications, store billing, and full device tests remain outstanding.

On a Mac with Android Studio, Xcode and an accessible production/staging HTTPS deployment:

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
export SCHOOLQUEST_APP_URL=https://YOUR-VERIFIED-SCHOOLQUEST-DOMAIN
npx cap add android
npx cap add ios
npx cap sync
npx cap open android
npx cap open ios
```

Review Capacitor's current server URL, navigation and App Store policies before shipping a remote-hosted webview. Capacitor live-reload `server.url` is generally a development mechanism; for production, build an approved bundled hybrid experience or a proper native client connected to the SchoolQuest API. Do not submit a placeholder shell to the stores.

## Mandatory validation

1. Install dependencies, generate Prisma client and run `npm run build` and `npm run lint`.
2. Test a first completed exam in subject A (allowed), second in A (blocked), first in B (allowed), and active-Pro repeat attempts (allowed).
3. Simulate concurrent submissions in one subject; exactly one free attempt should commit.
4. Confirm old completed attempts are recognized, and failed/aborted submissions do not consume a free attempt.
5. Confirm payments cannot be forged through the old action and expired Pro accounts get the free-per-subject rule.
6. Verify native builds on real Android and iOS hardware only after finalizing the mobile architecture.

No automated test runs or app-store build results are claimed by this commit.
