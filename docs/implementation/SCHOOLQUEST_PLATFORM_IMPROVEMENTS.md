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

**Deployment**

Not deployed. Netlify still has no hosted database URL.
