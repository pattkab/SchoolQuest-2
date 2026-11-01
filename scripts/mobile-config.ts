import { existsSync } from 'node:fs';

export function hostedUrl(value: string | undefined): string {
  if (!value) throw new Error('Set SCHOOLQUEST_APP_URL to your deployed HTTPS SchoolQuest address.');
  const url = new URL(value);
  const host = url.hostname.toLowerCase();
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash ||
      url.pathname !== '/' || !host.includes('.') || /^\d+\./.test(host) ||
      /(^|\.)(localhost|local|test|example|invalid)$/.test(host)) {
    throw new Error('SCHOOLQUEST_APP_URL must be a public HTTPS origin without credentials, paths, or query strings.');
  }
  return url.origin;
}

export function mobileServer(env: Record<string, string | undefined> = process.env) {
  if (env === process.env && existsSync('.env.mobile.local')) process.loadEnvFile('.env.mobile.local');
  const mode = env.SCHOOLQUEST_MOBILE_MODE || 'local';
  if (mode === 'local') return { url: 'http://localhost:3001', cleartext: true };
  if (mode === 'hosted') return { url: hostedUrl(env.SCHOOLQUEST_APP_URL), cleartext: false };
  throw new Error('SCHOOLQUEST_MOBILE_MODE must be local or hosted.');
}
