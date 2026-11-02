# SchoolQuest platform improvements

GitHub is the source branch for this work: `feature/schoolquest-platform-hardening`.
Production at https://schoolquestweb.netlify.app was not changed.

## Phase 1 — Robust examination and marking engine

**Status:** Completed for the web application and its server marking path.

**What changed**

- The server marks multiple choice, multi-select with partial credit, short answers, fill-in-the-blank (including several blanks), calculations with units, matching, ordering, diagram labels, and rubric-scored written answers.
- Diagram positions are stored as fractions of the image. The learner can type a label or drop a word on the mark. Accepted spellings are not sent to the browser.
- A learner gets one in-progress attempt per paper. Answers save with a version, so an older tab cannot overwrite a newer save.
- The time limit is calculated on the server from the start time and the paper duration. The page shows that remaining time. When it runs out, the server submits the saved attempt.
- Submitting twice returns the same result. A finalized attempt is not edited except by an accredited teacher, who must record a reason.
- A teacher can regrade automatically marked answers after a marking-scheme correction. Provisional AI scores stay distinct from teacher-confirmed scores.
- Spelling tolerance now uses a correct edit-distance calculation.

**Database**

Additive PostgreSQL columns and a `MarkOverride` table. Existing questions, attempts, and answers were kept. Applied locally with `prisma db push`. No production migration has been run.

**Tests**

`npm test` — 26 passed, 0 failed. That includes marking cases and a database test that resumes a saved answer, rejects a stale write, and checks that a second submit does not create a second result.

The practice paper "Counting fun" was opened in the browser. The page showed the server time remaining, accepted an answer, and reported Saved. The attempt created for that check was removed.

**Security**

Final marks are calculated on the server. Students can only open and submit their own attempts. Teacher marks require an accredited teacher, a learner they are allowed to review, and a written reason. Diagram answers are not included in the page payload.

**Not in this phase**

Flutter clients, offline examination packs, the background PDF pipeline, store billing, and the GitHub Actions release workflow are later phases. The web app still uses the Capacitor Android wrapper until the Flutter client exists.

**Commit:** `a7b8df65c475b18cf6aeecdce8573e32d7198fc4`

**Push:** `feature/schoolquest-platform-hardening` is on GitHub. It is not merged into `main`.

**Deployment**

Not deployed. Netlify still has no hosted database URL.

## Phase 2 — Low-bandwidth and offline learning

**Status:** Completed for the web app, with the limits below.

**Baseline**

- The class photo was a 2.3 MB PNG.
- Opening the library for one class could request up to 12 feeds before the learner chose a type or subject.
- There was no installable manifest, offline page, or saved-paper copy.

**What changed**

- The class photo is a 142 KB JPEG. On an exam, Data saver hides question pictures.
- The library downloads files only after a type or subject is chosen, and then from at most four feeds.
- Dashboard routes show a loading line instead of a blank wait.
- Fewer font weights are requested.
- The app has a manifest, an offline page, and a service worker. The worker stores only the offline page, the saved-paper page, and the small icon. It does not cache dashboard, login, or API responses.
- Save offline stores a paper in IndexedDB for 72 hours. The copy has no marking answers. A changed expiry does not pass the server signature check. After expiry the paper does not open, and answers already on the device stay there for upload.
- While a paper is open, a lost connection keeps the latest answers in the saved copy.

**Tests**

`npm test` — 30 passed, 0 failed. The browser showed the library waiting for a filter, and the offline page with a link to saved papers.

**Limits**

The service worker is registered in production, not while developing. A cold start offline opens the offline page; the saved paper itself opens from the saved-paper page. Flutter, the PDF pipeline, billing, and CI are still later phases.

**Commit:** `a9be26ab7f0f0c1a35d70b9108c06a762f766c8a`

**Push:** `feature/schoolquest-platform-hardening`. Not merged into `main`.

**Deployment**

Not deployed.

**Next phase:** asynchronous exam digitization.
