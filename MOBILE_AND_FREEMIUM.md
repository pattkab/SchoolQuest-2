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

## Yo Payments server-side collection foundation

- Added a real two-step Yo XML API adapter: initiate a mobile-money collection; check transaction status directly from Yo before granting Pro.
- Explicit opt-in environment: `YO_API_MODE=sandbox|production`, `YO_API_USERNAME`, `YO_API_PASSWORD`, and for production `YO_PRODUCTION_ENABLED=true`.
- Every initiation and verification is persisted in `SubscriptionPayment`; Pro is activated only after provider status `SUCCEEDED`, reference match, currency and amount match.
- This is **not approved or live** until provisioned against SchoolQuest's own Yo account and independently tested with valid Yo sandbox and production documentation.
- Provider callbacks/IPN certificate verification, full reconciliation/retry operations, operational refund workflow, card support, iOS/Android store billing, and independent security audit remain required for launch.
- Payment requests receiving transport errors are marked `REVIEW` to avoid double prompting customers; operations must reconcile these with Yo.

## Mobile digital subscription billing — channel policy

SchoolQuest Student Pro is a **digital subscription**, so the native apps need store-compliant billing:

| Distribution | Buy Pro in the app | Verification | Notes |
|---|---|---|---|
| Web/PWA | Yo Payments (mobile money; other Yo methods only if contracted) | Server-side Yo status check | Platform-independent login and entitlement |
| Google Play Android | **Google Play Billing** | Google Play Developer API + Real-time Developer Notifications | Google Pay wallet alone is not a substitute. Approved alternative-billing programmes are jurisdiction-specific. |
| Apple App Store iOS | **Apple In-App Purchase / StoreKit 2** | App Store Server API + Server Notifications V2 | Apple Pay wallet alone is not a substitute; external purchase entitlements vary by storefront. |

**Implementation contract:** `src/lib/mobile-billing.ts` defines native product identifiers and verification metadata, but no production native purchase SDK, backend store receipt verification, renewal notification ingestion, cancellation/refund reconciliation or native paywall is implemented yet. Never mint Pro from locally received purchase data, unverified signed transactions, or a client-controlled platform flag.

Next native implementation stage:
1. Register subscription products on App Store Connect and Google Play Console.
2. Create a proper Android/iOS app client: use native StoreKit 2 / Google Play Billing purchase APIs (or a rigorously audited Capacitor plugin), keeping platform-provided localized prices and terms.
3. Backend verification: Apple signed transactions plus App Store Server API and Server Notifications V2; Android purchase token validation with Google Play Developer API and Real-time Developer Notifications. Link verified purchases to the SchoolQuest account and reject token replay or cross-account reuse.
4. Maintain one source-of-truth Pro entitlement with its source/provider, verified expiration, auto-renewal status and revocation/refund records. The current legacy `subscriptionEndsAt` field is insufficient for native subscription lifecycle; extend it safely before go-live.
5. Never expose Yo checkout for digital subscriptions inside a store-distributed native WebView unless an approved programme/entitlement permits it. In the present remote URL shell, a simple user-agent or `?platform=ios` query is not a secure channel verification solution; disable native paywall sales until a native SDK is integrated and the web shell is segregated.
6. Existing valid web purchases may be usable across platforms when consistent with each store's multiplatform-services rules, but in-app purchase options must remain available where required.
7. Apple Pay and Google Pay can be considered separately for eligible physical/off-app goods/services through an approved payment processor; they are not implemented in SchoolQuest subscription checkout.
8. Test purchases, renewals, grace periods, failed billing, refund/revocation, restored purchases, cross-device sync and store review in sandbox environments before release.

Official policies (recheck before release): https://developer.apple.com/app-store/review/guidelines/ ; https://support.google.com/googleplay/android-developer/answer/9858738 .
