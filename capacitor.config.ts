/** Capacitor app shell configuration. Native projects are generated locally with
 * npx cap add android / ios after dependencies and a production HTTPS URL exist.
 * The hosted Next.js app uses server actions and cannot be statically exported.
 */
const appUrl = process.env.SCHOOLQUEST_APP_URL;
if (appUrl && !/^https:\/\//.test(appUrl)) throw new Error("SCHOOLQUEST_APP_URL must be HTTPS");

const config = {
  appId: "biz.potentiamotus.schoolquest",
  appName: "SchoolQuest",
  webDir: "mobile-shell",
  ...(appUrl ? { server: { url: appUrl, cleartext: false } } : {}),
};
export default config;
