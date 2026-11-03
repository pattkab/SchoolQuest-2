'use client';

import { useSyncExternalStore } from 'react';
import { Capacitor } from '@capacitor/core';
import { speechChunks } from './accessibility-settings';

const initial = { speaking: false, message: '' };
let state = initial;
let generation = 0;
let nativeSpeech: (typeof import('@capacitor-community/text-to-speech'))['TextToSpeech'] | undefined;
const listeners = new Set<() => void>();
function publish(speaking: boolean, message: string) { state = { speaking, message }; listeners.forEach(listener => listener()); }
function subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; }
export function useReadAloud() { return useSyncExternalStore(subscribe, () => state, () => initial); }

export function readablePageText(): string {
  const scope = document.querySelector('[data-reading-content]') || document.querySelector('main');
  if (!scope) return '';
  const copy = scope.cloneNode(true) as HTMLElement;
  copy.querySelectorAll('input, textarea, select, script, style, nav, aside, [hidden], [aria-hidden="true"], [data-no-read-aloud], .sr-only').forEach(element => element.remove());
  copy.querySelectorAll('button:not([data-read-label])').forEach(element => element.remove());
  copy.querySelectorAll('img').forEach(image => image.replaceWith(document.createTextNode(image.alt ? ` Image: ${image.alt}. ` : ' Image. Ask a teacher for a description if needed. ')));
  copy.querySelectorAll('p, h1, h2, h3, h4, li, td, th, dt, dd, div, button').forEach(element => element.append(document.createTextNode(' ')));
  return (copy.textContent || '').replace(/\s+/g, ' ').trim();
}

export function stopReadAloud() {
  generation += 1;
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
  if (nativeSpeech) void nativeSpeech.stop().catch(() => {});
  if (state.speaking) publish(false, 'Reading stopped.');
}

function browserSpeak(text: string, rate: number): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) { reject(new Error('Speech is not available in this browser. Try your device screen reader or another browser.')); return; }
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(item => item.lang.toLowerCase() === 'en-gb') || voices.find(item => item.lang.toLowerCase().startsWith('en'));
    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang || 'en-GB';
    utterance.rate = rate;
    utterance.onend = () => resolve();
    utterance.onerror = event => reject(new Error(event.error === 'not-allowed' ? 'Your browser blocked speech. Press Read aloud again or enable a device voice.' : 'Speech could not finish. Check your device voice settings and try again.'));
    window.speechSynthesis.speak(utterance);
  });
}

export async function startReadAloud(text: string, rate = 1) {
  stopReadAloud();
  const request = generation;
  const chunks = speechChunks(text);
  if (!chunks.length) { publish(false, 'There is no readable lesson or page text here.'); return; }
  publish(true, 'Reading aloud.');
  try {
    const native = Capacitor.isNativePlatform() && Capacitor.isPluginAvailable('TextToSpeech');
    if (native) nativeSpeech = (await import('@capacitor-community/text-to-speech')).TextToSpeech;
    for (const chunk of chunks) {
      if (request !== generation) return;
      if (native && nativeSpeech) await nativeSpeech.speak({ text: chunk, lang: 'en-US', rate, pitch: 1, volume: 1 });
      else await browserSpeak(chunk, rate);
    }
    if (request === generation) publish(false, 'Finished reading.');
  } catch (error) {
    if (request === generation) publish(false, error instanceof Error ? error.message : 'Speech is unavailable. Check your device voice settings.');
  }
}
