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

## Phase 3 — Asynchronous exam digitization

**Status:** Completed for the web upload path. The model is not called while the teacher is waiting on the upload.

**What changed**

- Uploading a past paper checks the file, stores it, and queues a job. The page returns the job immediately. Reading starts after that response, or when the teacher chooses “Read this paper”.
- The same queue is used for an admin practice-question upload. Revision notes are still read in the request, because they are not exam questions.
- A job can be queued, processing, awaiting review, needing correction, approved, published, rejected, failed, or cancelled.
- The reader’s questions are a draft. Missing marks, a repeated question, an unsupported answer, or an unconfirmed diagram label blocks approval.
- Diagram labels are suggestions until a teacher types the accepted label.
- Approval saves a draft paper. Learners cannot open it. Publishing is a separate step.
- Uploading the same file again returns the existing job. A queued job can be cancelled. A failed read is tried once more, then it stops.
- A teacher can queue 20 papers a day, with a 20,000 token allowance. Subquestions keep their parent question.

**Database**

Additive `DigitizationJob` and `DigitizationEvent` tables. Applied locally with `prisma db push`. No production migration and no seed. Uploaded files stay in `data/digitization/`, which is gitignored.

**Tests**

`npm test` — 35 passed, 0 failed. The processing test uses a stand-in reader, so Gemini is not called. It checks that a valid paper is approved as a draft, a missing mark and an unconfirmed diagram cannot be approved, a duplicate file returns the same job, a cancelled job is not read, and a failing reader stops after two attempts. The queue module does not import the Gemini client.

A signed-in learner who opened the queue was returned to the dashboard. The review form was not opened in the browser because that session is a learner account.

**Security**

Learners cannot open the queue. The processor never publishes a paper. A paper stays a draft until an accredited teacher publishes it. The upload action does not call the model.

**Limits**

Revision notes in the admin content tool still call the model during the request. There is no hosted database migration. Flutter, billing, and CI are later phases.

**Commit:** `6f00f0f3f6aa5aae8f58b29f0b4819e514ecec12`

**Push:** `feature/schoolquest-platform-hardening`. Not merged into `main`.

**Deployment**

Not deployed. Netlify still has no hosted database URL.

**Next phase:** Flutter Android and iOS clients.

## Phase 4 — Flutter Android and iOS

**Status:** The Flutter client builds and talks to the existing server. A signed Play bundle and a TestFlight build still need signing credentials that were not created here.

**What changed**

- The existing `android/` project is a Capacitor WebView. It stays uncommitted. The Flutter app is the mobile client and uses the same application id, `com.schoolquest.app`, so it is the same Play listing.
- Android and iOS open `https://schoolquestweb.netlify.app` unless a development build is given an explicit `API_BASE`. Staging and production reject a local address.
- Sign-in uses a random token stored only as a hash. The phone keeps the token in secure storage. Logout revokes it. A session lasts 14 days.
- Home, subjects, notes, exams, results, profile, help, and subscription screens use the server. Marking still happens in the existing exam service. A downloaded paper does not include the marking key.
- If a save fails, the answer stays on the phone and can be sent again.
- The subscription screen shows the server’s plan list. A request from the phone cannot start a subscription.
- Android debug builds run from min SDK 24, with R8 ready for release. Release signing reads `flutter/android/key.properties` when that file is supplied. iOS uses bundle id `com.schoolquest.app` and declares no exempt encryption.

**Database**

Additive `MobileSession` table. Applied locally with `prisma db push`. No production migration and no seed.

**Tests**

`npm test` — 40 passed, 0 failed. That includes session expiry, logout, a paper payload without the marking key, and the production address check.

`flutter analyze` reported no issues. `flutter test` — 6 passed.

`flutter build apk --debug` produced `flutter/build/app/outputs/flutter-apk/app-debug.apk`. The SchoolQuest emulator showed onboarding and the sign-in screen.

`flutter build ios --debug --no-codesign` produced `flutter/build/ios/iphoneos/Runner.app`.

A local registration through the API returned a session, the home screen showed the class and term, and a subscription request from the phone was refused. The temporary account was removed.

**Not produced**

No Play upload keystore was created, so no signed Android App Bundle was built. TestFlight still needs the Apple Developer account and a signing certificate. `flutter_secure_storage` does not yet support Swift Package Manager; CocoaPods was used for this build. Crash reporting was not added, because that needs the existing Firebase config rather than a new project.

**Commit:** `59423284f6374bba375ccf898523edaeea265736`

**Push:** `feature/schoolquest-platform-hardening`. Not merged into `main`.

**Deployment**

Not deployed. The live site does not have these mobile routes until a later deploy, and Netlify still has no hosted database URL.

**Next phase:** centralized subscriptions and entitlements.
