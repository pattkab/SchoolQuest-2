"use client";

import { useSyncExternalStore } from "react";

const storageKey = "schoolquest.sounds";
const listeners = new Set<() => void>();
let enabled = false;
let loaded = false;
let audio: AudioContext | undefined;

function snapshot() {
  if (!loaded) {
    loaded = true;
    try { enabled = localStorage.getItem(storageKey) === "on"; } catch { /* Use this visit's setting. */ }
  }
  return enabled;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export function useQuestSounds() {
  return useSyncExternalStore(subscribe, snapshot, () => false);
}

export function setQuestSounds(value: boolean) {
  loaded = true;
  enabled = value;
  try { localStorage.setItem(storageKey, value ? "on" : "off"); } catch { /* Use this visit's setting. */ }
  if (!value) void audio?.suspend().catch(() => {});
  listeners.forEach((listener) => listener());
}

/** Call in a click handler so mobile browsers can unlock audio. */
export function prepareQuestSound() {
  if (!snapshot()) return;
  try {
    audio ??= new AudioContext();
    if (audio.state === "suspended") void audio.resume().catch(() => {});
  } catch { /* Sound is optional on unsupported devices. */ }
}

const notes = {
  wave: [523, 659],
  correct: [523, 659, 784],
  complete: [523, 659, 784, 1047],
};

export function playQuestSound(kind: keyof typeof notes) {
  if (!snapshot() || !audio) return;
  const context = audio;
  const play = () => {
    if (!snapshot() || context.state !== "running") return;
    notes[kind].forEach((frequency, index) => {
      const start = context.currentTime + index * .085;
      const oscillator = context.createOscillator();
      const volume = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      volume.gain.setValueAtTime(0, start);
      volume.gain.linearRampToValueAtTime(.065, start + .018);
      volume.gain.exponentialRampToValueAtTime(.001, start + .16);
      oscillator.connect(volume).connect(context.destination);
      oscillator.start(start);
      oscillator.stop(start + .17);
      oscillator.onended = () => { oscillator.disconnect(); volume.disconnect(); };
    });
  };
  if (context.state === "running") play();
  else void context.resume().then(play).catch(() => {});
}
