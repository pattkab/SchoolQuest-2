# Fresh Teacher integration proposal

Research date: 6 September 2026. This is a proposed implementation, not a deployed integration.

School Quest should use Fresh Teacher as a source library and provide the subscriber learning service: answer questions, receive reliable marks and explanations, revise the relevant notes, and measure improvement over time.

## Verified source

- Repository: https://github.com/Fresh-Teacher/fresh-teacher.github.io (main branch).
- Science papers: https://fresh-teacher.github.io/PrimarySevenSciencePastPapers.json — 1,469 catalogue entries at inspection.
- Science notes: https://fresh-teacher.github.io/PrimarySevenScienceLessonNotes.json — 89 entries.
- Mathematics papers: https://fresh-teacher.github.io/PrimarySevenMTCPastPapers.json — 1,668 entries.
- Human-facing library: https://fresh-teacher.github.io/

The class/subject pages load these JSON arrays. Entries contain `title`, `description`, `price`, and `pdfUrl`; sampled titles are empty, and files can be hosted outside GitHub Pages. These are catalogue-entry counts, not verified unique or usable papers. Do not use the source `price` as a School Quest subscription price.

Several early Science entries correspond to already processed School Quest papers, including P.7 SCIENCE PLE SET 1, P. 7 End of Term I Examination, and P7 PRE P.L.E MOCK. Match these before importing duplicates.

## Student experience

1. Choose class, subject, and topic. Library cards distinguish source PDFs, notes, and reviewed interactive tests. Display Fresh Teacher attribution and an original-source link.
2. Subscribers choose practice mode (feedback after answering) or timed exam mode (feedback after submission). Keep the existing free sample paper.
3. Save answers and allow resume. Clearly show saving, saved, offline, and retry states; never promise cloud persistence after an unsuccessful write.
4. Return marks, explanations, and the marking status of every question. A response needing review remains pending; it is not recorded as an incorrect answer.
5. Link weak topics to relevant note pages and offer a short follow-up test using different questions.
6. Show a dated history of every sitting, subject and topic trends, and first-attempt versus repeat performance. Retaking a paper creates a new sitting and preserves the old result.

Example: a learner misses questions about seed dispersal, receives explanations and a link to the Seed Dispersal notes, then answers another reviewed question set. Their record shows both performances and dates. Reading a note alone does not count as demonstrated mastery.

Subscription expiry prevents starting new premium practice; previously earned results remain readable. Define how an already-started sitting is honoured, and enforce that policy consistently on the server.

## Content connection

Use an administrative importer to read selected catalogue URLs. Begin with P7 Science. Normalize URLs and metadata, flag uncertain classifications, check file availability, and deduplicate using source identity and downloaded content hashes. Do not clone the entire large repository for every refresh.

Retain original URL, publisher attribution, discovery time, source revision/hash, and page references. Pin the source and question versions used by a published test. Upstream changes create a new review candidate and must not silently change a student's historical paper.

Feed selected PDFs through the existing `pipeline/` OCR, question parsing, and diagram extraction. Review question numbering, subparts, diagrams, topic tags, marks, accepted answers, and explanations before publishing. Pair papers with source marking guides where available; validate pairings rather than trusting similar filenames. A paper without a validated guide remains a reading resource or an unpublished draft.

Notes need class/subject/topic tags and, where practical, page references. Map reviewed questions to these tags to select relevant revision material. Keep the source resource link available when no precise page mapping exists.

Refresh catalogues in an explicit scheduled import job after rollout; publish only reviewed changes. No automation has been created by this research. Preserve previously published content when a source disappears and flag the broken source for an administrator.

The repository reports an MIT license. Record reuse permission for selected educational documents, including third-party papers, before republishing them in the paid service; repository metadata alone does not establish each document's provenance.

## Reliable marking and history

Use server-validated identity and subscription entitlement when starting premium tests. Keep answer keys and final grading on the server. Client-side marking can provide provisional offline feedback if that mode is supported, but it must not become the authoritative score.

Use deterministic grading for reviewed multiple-choice answers, numeric answers with explicit units/tolerances, and short answers with reviewed accepted variants. Longer answers require a rubric: any future AI grader should return provisional rubric-level feedback and route uncertain responses for teacher review. Do not equate keyword presence with reliable essay marking.

Every sitting needs a unique attempt identity, linked answers, the paper and rubric versions, start/submit dates, mode, time spent, and grading status. Preserve awarded marks and feedback; corrections should retain an audit trail. A retry of submission must not duplicate an attempt or increment totals twice.

Final score history must be retrievable by attempt identity across devices. Local saves must be scoped to the signed-in user and attempt, including safe isolation from guest sessions. Load saved answers when resuming on another device.

Compute progress from authoritative graded attempts. Show awarded marks divided by available graded marks, with pending marks separately. Compare like subjects, levels, topics, and modes; label repeats and sample size. Avoid presenting changes between unrelated papers as proof of improvement. Provide paginated full history, not only the most recent 30 records, and keep small-sample topic estimates explicit.

## Existing code to build on and gaps found

| Area | Existing foundation | Required change |
| --- | --- | --- |
| Content | `pipeline/` and bundled `paperStore.ts` | Catalogue importer, provenance, deduplication, reviewed publication, linked notes |
| Subscription | `src/payments/entitlements.ts` | Server enforcement for content and grading; explicit expiry policy |
| Marking | `src/engine/markingEngine.ts` | Authoritative server grading; pending-review handling and rubric versions |
| Teacher guides | `src/data/answerStore.ts` | Guides currently use device-local storage; publish centrally for all learners |
| Attempts | `src/data/progressStore.ts` | Reliable, idempotent submissions and visible persistence failures |
| Local sessions | `src/data/paperStore.ts` | Current key is per paper; change to user/attempt isolation and cross-device restore |
| Results | `src/screens/ResultsScreen.tsx` | Currently reloads local paper session and recomputes marks; load preserved results by attempt instead |
| Progress | `src/screens/ProgressScreen.tsx` | Currently requests 30 attempts and navigates to results by paper; add full dated history, attempt navigation, topic trends |
| Score integrity | `app/firestore.rules` | Current rules permit owner-written scores; make final marks and aggregates server-owned |

Database edition and deployed configuration must be checked before implementing database changes. This proposal does not change the existing database or rules.

## Recommended first release

Deliver a complete P7 Science pilot with 10 reviewed papers, linked topic notes, server-verified subscriber access, authoritative marking, and immutable attempt history. Prioritize papers with available marking guides and overlap with the existing processed set. Expand to Mathematics after the pilot validates extraction and grading quality.

Acceptance checks:

- A subscribed learner completes a reviewed paper and receives the expected rubric-based marks.
- A learner without entitlement cannot bypass premium access through direct API calls.
- Retaking the same paper preserves both results; each opens the correct answers and original grading version.
- Refreshing or retrying submission does not duplicate scores or totals.
- Offline interruption exposes pending synchronization and successfully resumes after reconnecting.
- Switching users on a shared device never exposes another learner's answers.
- Cross-device resume restores the same attempt and answers.
- Questions awaiting review do not reduce the learner's finalized accuracy; review updates are audited.
- Source edits, rubric edits, and subscription expiry do not erase historical results.
- Topic feedback opens relevant notes, and history beyond 30 attempts remains accessible.
