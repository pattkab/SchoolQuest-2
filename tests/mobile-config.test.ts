import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { hostedUrl, mobileServer } from '../scripts/mobile-config';

test('local simulator configuration is explicit and hosted mode cannot silently fall back', () => {
  assert.deepEqual(mobileServer({}), { url: 'https://schoolquest.cc', cleartext: false });
  assert.deepEqual(mobileServer({ SCHOOLQUEST_MOBILE_MODE: 'hosted' }),
    { url: 'https://schoolquest.cc', cleartext: false });
  assert.deepEqual(mobileServer({ SCHOOLQUEST_MOBILE_MODE: 'local' }),
    { url: 'http://localhost:3001', cleartext: true });
  assert.throws(() => mobileServer({ SCHOOLQUEST_MOBILE_MODE: 'typo' }));
  assert.deepEqual(mobileServer({ SCHOOLQUEST_MOBILE_MODE: 'hosted', SCHOOLQUEST_APP_URL: 'https://schoolquest.potentiamotus.biz/' }),
    { url: 'https://schoolquest.potentiamotus.biz', cleartext: false });
});

test('release URL rejects local addresses, credentials, and accidental secrets', () => {
  for (const url of [undefined, 'http://schoolquest.potentiamotus.biz', 'https://localhost', 'https://127.0.0.1',
    'https://[::1]', 'https://[::ffff:127.0.0.1]', 'https://192.168.1.5', 'https://schoolquest.local',
    'https://schoolquest.test', 'https://schoolquest.example', 'https://user:secret@schoolquest.potentiamotus.biz',
    'https://schoolquest.potentiamotus.biz/path', 'https://schoolquest.potentiamotus.biz/?token=secret']) {
    assert.throws(() => hostedUrl(url), String(url));
  }
});

test('native build guard rejects unsynced, placeholder, and debug configurations', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'schoolquest-mobile-'));
  const config = path.join(dir, 'capacitor.config.json');
  const guard = (value: unknown) => {
    writeFileSync(config, JSON.stringify(value));
    return spawnSync('python3', ['scripts/check-mobile-release.py', config], { encoding: 'utf8' }).status;
  };
  try {
    assert.notEqual(guard({}), 0);
    assert.notEqual(guard({ server: mobileServer({ SCHOOLQUEST_MOBILE_MODE: 'local' }) }), 0);
    assert.equal(guard({ server: mobileServer({}) }), 0);
    assert.notEqual(guard({ server: { url: 'https://schoolquest.potentiamotus.biz', cleartext: true } }), 0);
    assert.notEqual(guard({ server: { url: 'https://[::ffff:127.0.0.1]', cleartext: false } }), 0);
    assert.equal(guard({ server: { url: 'https://schoolquest.potentiamotus.biz', cleartext: false } }), 0);
  } finally { rmSync(dir, { recursive: true }); }
});
