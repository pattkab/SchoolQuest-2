# SchoolQuest Android Studio: tap Run, load Netlify, and sign an AAB

## What this branch fixes
The original native shell defaulted to `http://localhost:3001`. This preview now defaults to `https://schoolquestweb.netlify.app` and has a dedicated `npm run android:hosted` command that **overrides existing ignored** `.env.mobile.local` files still set to `local`. The Android Studio green Run button starts the synced app without a local Next.js server. `npm run android:run` uses `adb reverse` only for explicitly selected localhost development.

**Release limitation:** Capacitor's `server.url` is officially intended for live reload, not production. You can **build and sign an AAB for testing**, but before public Play rollout use a production-supported packaged native/hybrid experience or another compliant architecture (for example, a properly configured Trusted Web Activity where suitable). The signing wizard and build guard do not certify store approval, native login, Google Play Billing, persistent backend storage, or privacy compliance.

## Safe Mac setup — do not lose your accessibility work
Your active app is `/Volumes/XPATT/APPS/schoolquest` on `codex/inclusive-learning`. Do NOT reset it, merge divergent PRs, or switch its branch. Use a separate Git worktree:

```bash
cd /Volumes/XPATT/APPS/schoolquest || exit 1
git fetch origin --prune
git worktree list
git worktree add -b android-play-preview \
  /Volumes/XPATT/APPS/schoolquest-android-preview \
  origin/fix/android-hosted-launch-and-aab-20261101
cd /Volumes/XPATT/APPS/schoolquest-android-preview || exit 1
npm ci --ignore-scripts
npm run android:hosted
```

Do the `git worktree add` step **only once**; if it says the branch/path already exists, run `git worktree list` and use the existing directory rather than deleting anything. The command should open Android Studio. If it doesn't, open `/Volumes/XPATT/APPS/schoolquest-android-preview/android` from **File > Open**.

Check the generated runtime config:

```bash
cd /Volumes/XPATT/APPS/schoolquest-android-preview
cat android/app/src/main/assets/capacitor.config.json
```

It must contain `"url": "https://schoolquestweb.netlify.app"` and `"cleartext": false`. A previously generated `http://localhost:3001` value means you opened or built a different, stale Android directory. Run `npm run android:hosted` again from this **exact** folder, sync Gradle, and select the `app` run configuration.

In Android Studio: **Device Manager** > start an Android emulator; select that emulator at top; select **app**; click the green **Run** triangle. The login and paper flows depend on the deployed Netlify backend and a network connection. Changes in local Next.js files will not appear until deployed to the hosted URL; the shell does not copy server-side features into an APK.

## Build and sign an Android App Bundle
First verify your SchoolQuest Play Console application ID is `biz.potentiamotus.schoolquest`. The existing native project sets `compileSdk` and `targetSdk` to **36**. Use a locally installed API 36 SDK and Gradle JDK 21.

```bash
cd /Volumes/XPATT/APPS/schoolquest-android-preview
npm run android:release
```

This explicitly syncs the HTTPS URL, turns off cleartext in Capacitor config, and opens the Android native project. In Android Studio:

1. **Build > Generate Signed App Bundle / APK** (or **Build > Generate Signed Bundle / APK**) > **Android App Bundle** > **Next**.
2. **For an existing Play listing**, use the correct existing registered **upload key**, if one exists. **For a new listing**, select **Create new...** and create a strong upload keystore **outside the Git checkout**. Back it up securely. Never put `.jks`, `.keystore`, key passwords or `key.properties` in Git, CI output or chat.
3. Set the key alias/password in the wizard (do not paste them here). Select **release**, then **Finish**.
4. Find the signed `.aab` in the path shown by Android Studio (usually `android/app/release/`), confirm its package ID and version code, and upload **to Google Play internal testing first**, not production.
5. Each subsequent uploaded version must increment `versionCode` in `android/app/build.gradle`. Never change `applicationId` for an existing Play listing.

Google's official signing instructions: https://developer.android.com/studio/publish/app-signing. The release guard blocks local HTTP/localhost or placeholder values; it verifies config only, not functionality or Play policy.

## If Android Studio still shows localhost
- Check you're running **/Volumes/XPATT/APPS/schoolquest-android-preview/android** (not the older `schoolquest` or `schoolquest-github-preview` native folder).
- Run `npm run android:hosted` from the preview root *before* pressing Play.
- Read `android/app/src/main/assets/capacitor.config.json` for the actual URL.
- Run **File > Sync Project with Gradle Files**, then Run; if needed uninstall only the emulator's existing SchoolQuest app before reinstalling.
- Verify the emulator has internet access and can open https://schoolquestweb.netlify.app/ in Chrome.
- If the URL opens in Chrome but the app stays blank, inspect Android Studio **Logcat**, filter on `Capacitor`, `chromium`, `net::ERR`, and test login/session cookies, navigation and any redirects.
- To deliberately use local development, set ignored `.env.mobile.local` to `SCHOOLQUEST_MOBILE_MODE=local`, run `npm run mobile:dev` in another Terminal, and `npm run android`. This is **not** the signing mode.

## Play Store launch gates (not solved by the URL or signing)
- Capacitor says `server.url` is a development/live-reload setting, **not intended for production**. Replace this delivery mode before general release and test a stable native/TWA architecture. Do not treat an app that only opens a remote site as automatically acceptable under Play's minimum-functionality / webview policies.
- Confirm real mobile registration/login/Google sign-in, back navigation, permission behavior, offline/error screen, session expiry, accessibility features and teacher/learner workflows on real Android hardware.
- Resolve reliable backend data persistence: Netlify build-bundled SQLite is not production-durable.
- Confirm native digital subscription billing uses Play Billing and server-side purchase verification; do not expose a prohibited alternative payment flow in an Android native app.
- Verify the **published** privacy policy URL is publicly viewable, account deletion request is accessible, and Play Data safety / children policies match actual code. The original linked Google Doc and the updated copy are **not** automatically interchangeable.
- Add proper terms, stable support, screenshots, content rating, test credentials for reviewers and an internal-test round before promoting any release.

Do not commit or upload a signing key.
