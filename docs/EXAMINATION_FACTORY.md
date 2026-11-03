# SchoolQuest Examination Factory

The canonical checkout is `/Volumes/XPATT/APPS/schoolquest`, backed by `pattkab/schoolquest` on `codex/unified-schoolquest`. Its web app, Capacitor shells and Flutter client share this backend. Older SchoolQuest-2 repositories and the sibling `.schoolquest-archive` folders are historical snapshots. Do not develop in those copies.

## Queue papers from the dashboard

An administrator opens Examination Factory at `/dashboard/teacher/digitization`. The page reads `data/fresh-teacher/summary.json`, which is counted from the full inventory. Choose a class, subject, and whether to read exam papers, marking guides, or notes. The action downloads the next matching PDFs from the pinned GitHub revision, checks each file against its Git blob, and queues a private digitization job. Learners cannot see a paper until a teacher approves and publishes it.

Objective answers are marked from the approved key. Written answers that miss the keyword rubric stay with a teacher. Live AI marking is off unless `SCHOOLQUEST_LIVE_AI_MARKING=true`.

## Stored papers and marking schemes

The low-cost path does not call an AI key when a learner submits.

```sh
npm run papers:pull
npm run papers:schemes
npm run papers:import
```

`papers:pull` saves past papers, holiday packages, exams, and marking guides in `data/fresh-teacher/library`. `papers:pull -- --guides` fetches answer keys and question papers with printed answers that the paper download did not already select. The PDF bytes stay on this computer. `papers:schemes` reads the saved files locally, pairs each paper with its GitHub marking guide, and writes `data/fresh-teacher/schemes/<git blob>.json`. A scheme is ready only when every parsed question has an answer taken from the paper or its guide. `papers:import` copies ready schemes into the database, including each answer on the question. Learner marking then uses those stored answers. Run `papers:schemes -- --limit=40` to prepare the next batch.

## Refresh the Fresh Teacher inventory

```sh
python3 pipeline/fresh_teacher.py data/fresh-teacher/inventory.json --crawl-links --resolve-mounts
```

The inventory pins the main GitHub Pages revision and linked project repository revisions, groups identical PDF blobs and keeps each source path. The optional link scan reads every HTML and JSON file at that revision and records linked pages, unresolved PDF URLs and scan failures. Inspect the failure list when measuring coverage. Unresolved links stay in the inventory for follow-up. Documents on external hosts require separate source verification.

## Import and review

Apply the current Prisma schema to a development database before importing. Use an administrator account and a subject ID corresponding to the source grade and subject. An import list contains up to 20 entries. For example:

```json
[
  {
    "gitBlob": "<40-character Git blob from the inventory>",
    "subjectId": "<SchoolQuest subject ID>",
    "permission": "<license or written authorization for publication>"
  }
]
```

```sh
node --env-file=.env --import tsx scripts/import-fresh-teacher.ts \
  --approvals /path/to/import-list.json --admin admin@example.com --extract
```

Use `--review-only` to ingest and extract private drafts while checking rights. Rerun with a documented permission record to unlock publication. Omit `--extract` to leave papers queued for processing from the Examination Factory. The source bytes are stored with the job in PostgreSQL and verified against the pinned blob before import. Limits apply per operator and files over 15 MB need to be prepared separately.

Extraction uses the configured Gemini model and credentials. Review each draft against the original PDF, including any source pages flagged for illustrations. Check transcribed question order, passages, answer keys, marks, rubrics and timing. For a flagged illustration, attach a PNG or JPEG crop from the original paper before approving the draft. Approve the draft and publish from the Examination Factory. Learners find published exams under the assigned subject. Objective questions use the existing deterministic markers, and AI marks on eligible written answers go through moderation.

Use a billing-enabled Vertex AI project or configure `GEMINI_API_KEY` for Gemini API access. Keep credentials in the environment. Run imports against a test database and validate the pilot before scheduling bulk processing.
