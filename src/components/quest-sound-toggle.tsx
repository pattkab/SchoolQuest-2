"use client";

import { Volume2, VolumeX } from "lucide-react";
import { playQuestSound, prepareQuestSound, setQuestSounds, useQuestSounds } from "@/lib/quest-sounds";

export function QuestSoundToggle({ className }: { className?: string }) {
  const enabled = useQuestSounds();
  const Icon = enabled ? Volume2 : VolumeX;
  return <button type="button" aria-pressed={enabled}
    className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-bold ${className || ""}`}
    onClick={() => {
      setQuestSounds(!enabled);
      if (!enabled) { prepareQuestSound(); playQuestSound("wave"); }
    }}>
    <Icon size={16} aria-hidden="true" /> Sound effects
  </button>;
}
