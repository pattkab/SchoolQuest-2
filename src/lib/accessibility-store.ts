'use client';

import { useSyncExternalStore } from 'react';
import { defaultAccessibility, parseAccessibility, type AccessibilitySettings } from './accessibility-settings';

const key = 'schoolquest.accessibility.v1';
const listeners = new Set<() => void>();
let current = defaultAccessibility;
let loaded = false;

function snapshot() {
  if (!loaded && typeof window !== 'undefined') {
    loaded = true;
    try { current = parseAccessibility(JSON.parse(localStorage.getItem(key) || '{}')); } catch { current = defaultAccessibility; }
  }
  return current;
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  const storage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) { loaded = false; snapshot(); listeners.forEach(notify => notify()); }
  };
  window.addEventListener('storage', storage);
  return () => { listeners.delete(listener); window.removeEventListener('storage', storage); };
}
export function updateAccessibility(change: Partial<AccessibilitySettings>) {
  current = parseAccessibility({ ...snapshot(), ...change });
  try { localStorage.setItem(key, JSON.stringify(current)); } catch { /* Apply for this visit if device storage is unavailable. */ }
  listeners.forEach(notify => notify());
}
export function useAccessibility() {
  return useSyncExternalStore(subscribe, snapshot, () => defaultAccessibility);
}
