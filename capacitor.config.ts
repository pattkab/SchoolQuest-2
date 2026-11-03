import type { CapacitorConfig } from '@capacitor/cli';

/**
 * The WebView URL is chosen in the Android project, not here.
 * Debug builds open the Next.js dev server on the emulator host.
 * Release builds open SCHOOLQUEST_RELEASE_URL from android/gradle.properties.
 */
const config: CapacitorConfig = {
  appId: 'com.schoolquest.app',
  appName: 'School Quest',
  webDir: 'mobile/www',
  android: {
    allowMixedContent: false,
  },
  server: {
    androidScheme: 'https',
  },
};

export default config;
