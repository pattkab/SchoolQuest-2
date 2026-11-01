import type { CapacitorConfig } from '@capacitor/cli';
import { mobileServer } from './scripts/mobile-config';

const config: CapacitorConfig = {
  appId: 'biz.potentiamotus.schoolquest',
  appName: 'SchoolQuest',
  webDir: 'mobile-shell',
  ios: { contentInset: 'always' },
  server: mobileServer(),
};
export default config;
