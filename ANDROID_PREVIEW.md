# Mobile preview

The original one-off Android preview has become a repeatable Android/iOS workflow.
See [MOBILE_WORKFLOW.md](MOBILE_WORKFLOW.md) for setup, GitHub updates, emulator and
simulator runs, signing, and release preparation.

Use `npm run mobile:dev` in one terminal, then `npm run android` or `npm run ios`
in another. Default mode is local. `SCHOOLQUEST_ANDROID_PREVIEW` is no longer used;
select `SCHOOLQUEST_MOBILE_MODE=local` or `hosted` in `.env.mobile.local` instead.
