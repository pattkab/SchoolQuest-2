# SchoolQuest: GitHub → Mac mini → Android Studio / Xcode

The working checkout is `/Volumes/XPATT/APPS/schoolquest-github-preview`.
GitHub repository: https://github.com/pattkab/SchoolQuest . The original
`/Volumes/XPATT/APPS/schoolquest` folder is preserved; its origin URL now uses the renamed repository.

Both native projects are version controlled. Do not regenerate them with `cap add`
after each update: that would discard future native work. Commit native changes on
GitHub alongside the web source. Exclude signing keys, local configuration, databases,
build outputs, and secrets (already covered by `.gitignore`).

## First setup on another Mac

Requirements: Node 22.18+ (Node 22 LTS is used in CI), npm, Python 3,
Android Studio with SDK 36 and JDK 21 (`brew install openjdk@21` on this Mac), Xcode with an iOS simulator.
iOS uses Swift Package Manager; CocoaPods is not required for this project.

```sh
git clone https://github.com/pattkab/SchoolQuest.git
cd SchoolQuest
# Until this work is merged into main:
git switch codex/mobile-workflow
npm ci --ignore-scripts
npm run mobile:setup
cp .env.mobile.example .env.mobile.local
npm run mobile:doctor
```

`mobile:setup` creates an isolated local SQLite database and seeds it on first use.
Later calls apply schema changes without resetting records; destructive schema changes
stop for manual review. Never point this command at a production database.

## Everyday workflow after editing on GitHub

Close running native builds and stop the local web server before updating dependencies.
Edit the same branch your Mac tracks (shown by `git branch -vv`). Until the review
branch is merged, use `codex/mobile-workflow`. After merge, switch to `main` and
track `origin/main`. Changes on other branches do not appear automatically.

```sh
cd /Volumes/XPATT/APPS/schoolquest-github-preview
npm run mobile:update
npm run mobile:setup
npm run mobile:dev
```

Leave that terminal running. In a second terminal, open an IDE:

```sh
cd /Volumes/XPATT/APPS/schoolquest-github-preview
npm run android
# or
npm run ios
```

The updater refuses dirty or detached checkouts and non-fast-forward updates.
It does not force, reset, stash, merge diverged branches, or delete your work.
For ordinary web edits the running development server reloads the UI. Native/plugin
changes require a new sync and native build. Hosted apps display the deployed server,
so Git pulls alone do not deploy server changes.

## Run locally

Keep `SCHOOLQUEST_MOBILE_MODE=local` in `.env.mobile.local`.
Start the Medium_Phone emulator from Android Studio Device Manager, then:

```sh
~/Library/Android/sdk/platform-tools/adb reverse tcp:3001 tcp:3001
npm run android
```

In Android Studio Settings → Build, Execution, Deployment → Build Tools → Gradle,
select JDK 21 as the Gradle JDK (`/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home`
on this Mac). Select the emulator and click Run in Android Studio. Alternatively use
`npm run android:run` with one emulator/device connected (it sets up port forwarding).
A USB Android device can use the same forwarding. For multiple devices, select one
with `ANDROID_SERIAL`. Re-establish forwarding when the emulator/device restarts.

In Xcode select the App scheme and an iPhone simulator, then Run.
`npm run ios:run` also offers a simulator selection. Both simulators connect to
`http://localhost:3001`. Physical iPhones require a reachable HTTPS hosted environment;
Mac localhost is not the phone's localhost.

Local seeded demo student: phone `0702222222`, PIN `1234`.
These are local sample records, not your deployed production data.

## Hosted staging and release preparation

Set your actual deployed SchoolQuest origin in the ignored `.env.mobile.local`:

```env
SCHOOLQUEST_MOBILE_MODE=hosted
SCHOOLQUEST_APP_URL=https://YOUR-REAL-SCHOOLQUEST-DOMAIN
```

Then run `npm run android` or `npm run ios` to test that deployment.
The URL must be an HTTPS origin, without a subpath, query, or credentials.
The Next.js backend must be deployed separately with its production database and
authentication configuration. A static web export cannot replace its server actions.

For store preparation:

```sh
npm run android:release
# or
npm run ios:release
```

These commands sync the hosted URL and open the IDE. Android Release builds and
Xcode Release archives reject missing URLs, HTTP, localhost and placeholder shells,
even when built directly from the IDE. A passing check only verifies configuration;
it does not establish that the URL is live or the app meets store requirements.
To return to local work, set mode back to `local` and reopen with `npm run android` / `ios`.

### Google Play Console

In Android Studio, use **Build → Generate Signed App Bundle / APK → Android App Bundle**.
Use your existing upload key if a SchoolQuest app already exists; keep its keystore
and passwords outside Git. The application ID is `biz.potentiamotus.schoolquest`;
confirm it against any existing listing before the first upload. Increase
`versionCode` and `versionName` in `android/app/build.gradle` for each release.
Upload the signed AAB to an internal testing track first, complete the listing,
privacy and Data safety information, test purchases and account flows, then submit
for review in Google Play Console.

### Apple App Store Connect

Open `ios/App/App.xcodeproj`, select the App target → Signing & Capabilities,
and choose the correct Apple Developer team. Confirm the bundle ID against your
App Store Connect record before registering a new one. Set the Version and Build
(increment Build for each upload), choose a generic iOS device, then
**Product → Archive → Organizer → Distribute App → App Store Connect**.
Use TestFlight before submitting the App Store version for review.
Signing, upload, and public release are separate steps; none is automated here.

## Current product work before store submission

The repository currently supplies a hosted Capacitor shell. Native store purchases,
receipt verification, native sign-in/deep links, offline behavior, icons/screenshots,
and full device testing still need implementation or review; see
`MOBILE_AND_FREEMIUM.md`. The web mobile-money flow must not be assumed to satisfy
native store billing requirements. Verify current store rules for the actual business
model before submitting. No App Store or Play Console release has been published.

Official guides:
- https://capacitorjs.com/docs/android/deploying-to-google-play
- https://capacitorjs.com/docs/ios/deploying-to-app-store
- https://developer.apple.com/app-store/review/guidelines/

## Checks

```sh
npm run mobile:test
npx tsc --noEmit
npm run lint
```

Android SDK path and JDK can be overridden with `ANDROID_HOME` and `JAVA_HOME`.
The sync command writes this Mac's ignored `android/local.properties` automatically.
