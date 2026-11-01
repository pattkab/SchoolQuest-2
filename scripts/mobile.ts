import { randomBytes } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mobileServer } from './mobile-config';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);
const command = process.argv[2];
const platform = process.argv[3];
// Load the ignored environment file before passing environment to child processes.
mobileServer();
const env = { ...process.env };
env.ANDROID_HOME ||= path.join(homedir(), 'Library/Android/sdk');
const jdk = '/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home';
if (!env.JAVA_HOME && existsSync(jdk)) env.JAVA_HOME = jdk;

function run(bin: string, args: string[], cwd = root) {
  const result = spawnSync(bin, args, { cwd, env, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${bin} failed (${result.status}).`);
}
function git(args: string[]) {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr.trim());
  return result.stdout.trim();
}
function cap(args: string[]) { run('npx', ['--no-install', 'cap', ...args]); }
function checkPlatform() {
  if (platform !== 'android' && platform !== 'ios') throw new Error('Choose android or ios.');
  return platform;
}
function sync() {
  const target = checkPlatform();
  mobileServer();
  if (!existsSync(target)) throw new Error(`Missing committed ${target} project. Check your Git branch.`);
  if (target === 'android') writeFileSync('android/local.properties', `sdk.dir=${env.ANDROID_HOME}\n`);
  cap(['sync', target]);
}

try {
  if (command === 'update') {
    if (git(['status', '--porcelain'])) throw new Error('Local changes found. Commit or preserve them before updating; nothing was overwritten.');
    git(['symbolic-ref', '--quiet', 'HEAD']);
    const upstream = git(['rev-parse', '--abbrev-ref', '@{upstream}']);
    run('git', ['fetch', '--prune', 'origin']);
    run('git', ['merge', '--ff-only', upstream]);
    run('npm', ['ci', '--ignore-scripts']);
    run('npx', ['--no-install', 'prisma', 'generate']);
    console.log('Updated tracked GitHub branch. Run mobile:setup for local schema changes, then android or ios.');
  } else if (command === 'setup') {
    if (!existsSync('.env')) {
      writeFileSync('.env', `AUTH_SECRET=${randomBytes(32).toString('hex')}\nAUTH_TRUST_HOST=true\nAUTH_URL=http://localhost:3001\n`, { mode: 0o600 });
    }
    mkdirSync('prisma', { recursive: true });
    const fresh = !existsSync('prisma/dev.db');
    if (fresh) writeFileSync('prisma/dev.db', '');
    run('npx', ['--no-install', 'prisma', 'generate']);
    run('npx', ['--no-install', 'prisma', 'db', 'push']);
    if (fresh) run('npm', ['run', 'db:seed']);
    console.log('Local database ready. Existing records were preserved.');
  } else if (command === 'sync') {
    sync();
  } else if (command === 'open') {
    sync();
    cap(['open', checkPlatform()]);
  } else if (command === 'run') {
    sync();
    // ADB port forwarding applies ONLY to deliberate localhost development.
    if (platform === 'android' && mobileServer().url === 'http://localhost:3001') {
      run(path.join(env.ANDROID_HOME, 'platform-tools/adb'), ['reverse', 'tcp:3001', 'tcp:3001']);
    }
    cap(['run', checkPlatform(), '--no-sync']);
  } else if (command === 'hosted') {
    // Override old .env.mobile.local files that still select localhost.
    process.env.SCHOOLQUEST_MOBILE_MODE = env.SCHOOLQUEST_MOBILE_MODE = 'hosted';
    sync();
    console.log(`Android Studio Run will load ${mobileServer().url}; no local web server required.`);
    cap(['open', checkPlatform()]);
  } else if (command === 'release') {
    process.env.SCHOOLQUEST_MOBILE_MODE = env.SCHOOLQUEST_MOBILE_MODE = 'hosted';
    mobileServer();
    sync();
    console.log('Hosted configuration ready. Complete signing and release in the IDE. This does not certify store readiness.');
    cap(['open', checkPlatform()]);
  } else if (command === 'doctor') {
    console.log(`Checkout: ${root}\nBranch: ${git(['branch', '--show-current'])}\nCommit: ${git(['rev-parse', '--short', 'HEAD'])}`);
    console.log(`Mobile server: ${JSON.stringify(mobileServer())}`);
    run('node', ['--version']);
    run(path.join(env.ANDROID_HOME, 'platform-tools/adb'), ['devices']);
    run('xcodebuild', ['-version']);
  } else {
    throw new Error('Usage: mobile.ts doctor|update|setup|sync|open|run|hosted|release [android|ios]');
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
