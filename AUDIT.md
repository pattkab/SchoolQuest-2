# SchoolQuest audit — 1 November 2026

Branch: `schoolquest-2-phase-0`. This is the Phase 0 record. PassSmart, Mwalimu, offline packs, and Yo Payments are not built yet.

The live app remains the existing Next.js 16, React 19, Prisma, and SQLite system. Roles stay Student, Teacher, School manager, and Site administrator. Parents are not a fifth module.

## Inventory

| Area | Existing | Working | Incomplete | Vulnerable before this pass | Change in this pass |
| --- | --- | --- | --- | --- | --- |
| Sign-in | Phone and PIN, Google via Firebase | Demo accounts and Google first sign-in | No recovery, no OTP, PIN can be 4 digits | An account with no password hash accepted any PIN | A missing hash now rejects every password |
| Class change | Student class picker | Saves the signed-in learner's class | No term or exam target | Any caller could set any user's class | Only the signed-in student can change their own class |
| Subscriptions | Trial dates and a Mobile Money screen | Trials still open practice | No Yo Payments, no receipts, prices are not the proposed annual plans | The pay button wrote a subscription with no payment | The button no longer charges or extends access |
| School fees | Charges, payments, attendance, messages | Same-school attendance and messages | Fees are records, not a payment gateway | A manager could attach fees to a user outside the school | Charges and payments require a student in that school |
| Enrolment | School manager creates a learner | New learners get a hashed PIN | Default PIN was 1234 when the field was empty | Enrolment could turn a teacher or admin into a student | Non-students are refused. Existing passwords are kept |
| Marking | Objective marker plus Gemini for open answers | Objective questions still mark immediately | AI marks are not an official result | Any accredited teacher could open and mark any learner. AI marks were stored as finished | Queue and scripts are limited to the teacher's school or class. AI marks stay provisional until a teacher confirms them |
| Results page | Attempt review | The learner sees their own script | No guardian view | Any non-student could open another learner's script | Outsiders are denied |
| Content import | Admin engine and teacher PDF upload | Admins can still build notes and papers | No review states, no rights record, no job queue | Any teacher could publish a paper. A link could fetch an internal address | Only accredited teachers or site admins publish. Links must be public https, with redirect and size checks |
| Library sync | Fresh Teacher feed sync | Still available to site admins | Rights are still "in progress" | Any signed-in user could start a sync | Site admins only |
| Curriculum | Level, class, subject, topic, seeded P.1–P.7 notes | Learn, practice, and syllabus navigation | No S1–S6, no outcomes, competencies, or version history | — | Unchanged |
| School data | EMIS search on registration | Search works on the live site for the downloaded register | The full register is still downloading. SQLite on Netlify does not keep new writes across cold starts | — | Unchanged |
| Firebase | Google sign-in and storage upload | Google sign-in is live | Storage rules may refuse unsigned uploads | Public web config is also hardcoded so the live site keeps working if env vars are missing | Left in place. It is a public client config, not a server secret |
| Auth secret | Fallback string in `src/auth.config.ts` | Sessions work on the current host | — | A known fallback signs session cookies if `AUTH_SECRET` is unset | Left in place. Removing it before Netlify has `AUTH_SECRET` would lock the live site on the next release |
| Database | SQLite file copied to `/tmp` on Netlify | Seeded demo data survives each build | Production PostgreSQL is not set up | New sign-ups and marks can disappear on a cold start | Not migrated in this pass |
| Copyright | Footer disclaimer | Users can see that reuse permission is in progress | No licence record, takedown flow, or UNEB/NCDC approval | Imported papers must not be treated as licensed | Unchanged |

## Production database

Stay on SQLite until a hosted Postgres URL exists. The move should be additive: export users, papers, questions, attempts, answers, schools, and subscriptions; load them into Postgres; point `DATABASE_URL` at Postgres; stop copying `prisma/dev.db` into `/tmp`. Do not reset the live seed as if it were the only data.

## Not started

Phases 1–7 from the master brief are not implemented: learner dashboard rebuild, lesson plans, schemes of work, assessment builder, guardian dashboard, Yo Payments, offline packs, and secondary curriculum. Those need their own tested passes. This pass is not a launch of paid subscriptions.

## Checks

`npx tsx --test tests/phase0.test.ts` covers missing password hashes and blocked document links. `npx tsc --noEmit` covers the type changes. The live site was not redeployed.
