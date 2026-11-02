# SchoolQuest operations

GitHub is the source for this app. The feature branch is `feature/schoolquest-platform-hardening`. The live site at https://schoolquestweb.netlify.app is unchanged until a hosted Postgres URL is added in Netlify and a reviewed release is deployed.

This file is the setup, release, and incident guide. Branch protection on GitHub was not changed.

## Architecture

SchoolQuest is a Next.js server with PostgreSQL through Prisma 5.22. Learners use the website or the Flutter app in `flutter/`. Both talk to the same server. The Flutter application id is `com.schoolquest.app`.

Exams are marked on the server. One free practice exam is stored per learner and subject. Premium access comes from an entitlement created after a verified payment. Files for AI digitization stay on the server under `data/digitization/`, which is not committed.

## Repository setup

1. Use Node.js 22 and PostgreSQL 16.
2. Copy the environment values into a local `.env`. Do not commit that file.
3. Install dependencies with `npm ci`.
4. Apply the schema with `npx prisma db push`.
5. For a local sample, run `npm run db:seed`. The sample PIN is `1234` and it is not a production account.
6. Start the app with `npm run dev`.

Checks:

- `npm test`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

Flutter lives in `flutter/`. From that directory, `flutter analyze` and `flutter test` check the client. Development builds need an explicit `API_BASE`. Release builds use https://schoolquestweb.netlify.app.

## Environment configuration

Set these on the host, not in Git.

| Name | Use |
| --- | --- |
| `DATABASE_URL` | Postgres connection string |
| `AUTH_SECRET` | Session signing |
| `AUTH_URL` | Public site URL |
| `AUTH_TRUST_HOST` | `true` behind Netlify |
| `SCHOOLQUEST_ENV` | `development`, `staging`, or `production` |
| `YO_API_USERNAME`, `YO_API_PASSWORD`, `YO_WEBHOOK_SECRET` | Mobile-money checkout and signed notices |
| `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` | Optional Google sign-in |
| `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_LOCATION` | Optional AI marking and digitization |

`npm run db:seed` refuses to run when `SCHOOLQUEST_ENV` is `staging` or `production`, and when `NETLIFY=true`. A Netlify build must not seed.

## Database changes

Schema changes in this branch were applied locally with `prisma db push`. They add columns and tables and do not delete learner data. There is no production migration yet. Before a hosted database is updated, take a backup, run `prisma db push` against that database from a trusted machine, and confirm the app starts. Do not use `db:reset` on a hosted database.

## Environments

- Development is this computer. It may use the local sample seed.
- Staging should be a separate host, database, and set of payment credentials. It does not exist yet.
- Production is https://schoolquestweb.netlify.app. It deploys only after a person reviews the branch and a hosted `DATABASE_URL` exists. GitHub Actions does not deploy it.

Staging credentials must not be copied into the production environment.

## Web deployment

Netlify builds with `npx prisma generate && npx next build`. The site id is `schoolquestweb`. Do not add a seed command to that build. After a reviewed deploy, open the site and the health check at `/api/health`. A database problem returns HTTP 503 and does not include the connection string.

## Android

The Flutter release build is `flutter build apk --release` from `flutter/`. Signing is read from `flutter/android/key.properties` only when that file exists. Do not commit the keystore or `key.properties`. A local release build produced `flutter/build/app/outputs/flutter-apk/app-release.apk`. `apksigner` reported that this APK is unsigned, so it is not a Play upload. Do not create a second Play listing. The application id stays `com.schoolquest.app`.

CI uploads the release APK it built as a GitHub artifact. That artifact is for inspection. It is not published to Play.

## iOS

An unsigned iOS build was produced locally in Phase 4 with CocoaPods. GitHub’s Ubuntu runners cannot compile iOS, so CI does not claim an iOS build. A signed build needs a Mac, Xcode, and an Apple signing certificate that is not stored in this repository. The bundle id is `com.schoolquest.app`.

## Payments

Premium turns on only after the server verifies a payment.

- Web mobile money creates a pending payment. Yo Payments must sign the raw body with `YO_WEBHOOK_SECRET` in `x-schoolquest-signature`.
- Google Play and Apple notices fail closed until store credentials and a real verifier are configured. An unsigned Apple notice cannot revoke or extend access.
- A repeated verified notice does not extend the period twice.
- Tablets, books, and shirts do not open Premium.
- The phone cannot activate a subscription by calling the API.

The Yo Payments, Play, and Apple sandboxes have not been run.

## AI processing

A teacher upload is queued and processed after the response. The model is not called inside the upload action. Generated questions stay in draft until a teacher approves them. Daily caps are 20 jobs and 20,000 tokens. Failures are recorded as an operations event with an error class, not the paper text.

## Monitoring

The server writes one JSON line for payment rejection, examination save failure, digitization failure, limited sign-in, AI marking failure, and a database health failure. Those lines omit answers, passwords, tokens, email addresses, and phone numbers. `/api/health` checks that Postgres answers. There is no third-party error tracker configured.

## Incident response and rollback

1. Confirm the failure on `/api/health` or the host logs. Do not copy learner answers into a ticket.
2. If a release caused it, deploy the previous successful build again. On GitHub, that is a revert of the release commit, then the same reviewed Netlify deploy. This was not rehearsed on the live site because the live site has no hosted database yet.
3. Database changes in this branch are additive. Rolling back the code does not drop the new tables. Restoring learner data means restoring a database backup, not running `db:reset`.
4. Payment mistakes are corrected by a verified refund notice, which revokes the entitlement. Do not edit a learner’s subscription date by hand and expect exams to unlock.
5. The sample seed cannot repair production. The seed command exits on a hosted environment.

## Release checklist

- CI on `feature/schoolquest-platform-hardening` is green.
- `npm test`, lint, type check, and the production build passed.
- No `.env`, keystore, or `key.properties` is in the commit.
- `npm audit` reports no critical advisory. Remaining high advisories need a breaking Firebase, Zod, or shadcn upgrade, so they were left in place.
- The release notes name the learner-facing change and any schema change.
- A person reviews the pull request. Required checks and branch protection were not changed from here.
- Production still waits for a hosted `DATABASE_URL` and an explicit deploy approval.
- Tag a release only after that deploy is verified. No production tag was created in this phase.

## Remaining manual steps

- Hosted Postgres URL in Netlify.
- `YO_WEBHOOK_SECRET` and Yo Payments account.
- Google Play service account and the upload keystore.
- Apple in-app purchase key.
- Optional Google sign-in and Firebase measurement ids.
- A staging host, if one is wanted before production.
