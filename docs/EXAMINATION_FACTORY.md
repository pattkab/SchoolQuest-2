# SchoolQuest Examination Factory

The canonical checkout is `schoolquest`, backed by `pattkab/schoolquest`. Its web app, Capacitor shells and Flutter client share the SchoolQuest backend. The older SchoolQuest-2 repositories preserve historical snapshots. The newer exam and entitlement engines are the runtime source of truth.

## Refresh the Fresh Teacher inventory

```sh
python3 pipeline/fresh_teacher.py data/fresh-teacher/inventory.json --crawl-links
```

The inventory pins the GitHub Pages revision, groups identical PDF blobs and keeps each source path. The optional link scan reads every HTML and JSON file at that revision and records linked pages, unresolved PDF URLs and scan failures. Inspect the failure list when measuring coverage. Unresolved links stay in the inventory for follow-up. Documents on external hosts require separate source verification.

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

Extraction uses the configured Gemini model and credentials. Review each draft against the original PDF, including any source pages flagged for illustrations. Check transcribed question order, passages, answer keys, marks, rubrics and timing. Diagram reconstruction still requires manual preparation. Approve the draft and publish from the Examination Factory. Learners find published exams under the assigned subject. Objective questions use the existing deterministic markers, and AI marks on eligible written answers go through moderation.

Use a billing-enabled Vertex AI project or configure `GEMINI_API_KEY` for Gemini API access. Keep credentials in the environment. Run imports against a test database and validate the pilot before scheduling bulk processing.
