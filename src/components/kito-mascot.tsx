"use client";

import { useState } from "react";
import { playQuestSound, prepareQuestSound } from "@/lib/quest-sounds";
import { QuestSoundToggle } from "./quest-sound-toggle";
import { Star, Sparkles } from "lucide-react";

export function KitoMascot() {
  const [wave, setWave] = useState(0);
  return (
    <div className="quest-mascot">
      <div key={wave} className="relative" aria-hidden="true">
        <Star className="quest-mascot-star quest-mascot-star-left" fill="currentColor" />
        <Sparkles className="quest-mascot-star quest-mascot-star-right" />
        <svg className="quest-mascot-owl" viewBox="0 0 216 190" fill="none" focusable="false">
          <ellipse cx="106" cy="169" rx="72" ry="12" fill="#181043" opacity=".23" />
          <path d="M78 151v15m53-15v15" stroke="#f4ad30" strokeWidth="12" strokeLinecap="round" />
          <path d="M58 59 51 24l38 18a68 68 0 0 1 38 0l38-18-7 35a61 61 0 0 1 13 39c0 38-27 62-63 62S45 136 45 98a61 61 0 0 1 13-39Z" fill="#a887fc" stroke="#34245e" strokeWidth="5" strokeLinejoin="round" />
          <path className="quest-mascot-wing" d="M159 111c14-1 26-12 33-24 11 18-1 46-28 46" fill="#c6adff" stroke="#34245e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M46 104c-18 1-25 18-19 33 4 9 17 11 28 2" fill="#c6adff" stroke="#34245e" strokeWidth="5" strokeLinecap="round" />
          <path d="M108 64c11-15 37-13 45 7 11 28-14 52-45 41-31 11-56-13-45-41 8-20 34-22 45-7Z" fill="#fff5dc" />
          <g className="quest-mascot-eyes" fill="#251745">
            <ellipse cx="88" cy="84" rx="6" ry="8" /><ellipse cx="128" cy="84" rx="6" ry="8" />
          </g>
          <path d="m98 94 10 11 10-11c-6-5-14-5-20 0Z" fill="#e48b23" />
          <circle cx="75" cy="98" r="5" fill="#f4a6a5" /><circle cx="141" cy="98" r="5" fill="#f4a6a5" />
          <path d="M108 125c-15-11-28-12-43-8v28c18-4 30-1 43 8 13-9 25-12 43-8v-28c-15-4-28-3-43 8Z" fill="#82edbc" stroke="#34245e" strokeWidth="4" strokeLinejoin="round" />
          <path d="M108 126v26m-31-24c7 0 13 2 19 5m42-5c-7 0-13 2-19 5" stroke="#236a55" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      <button type="button" onClick={() => { setWave((count) => count + 1); prepareQuestSound(); playQuestSound("wave"); }}
        className="mx-auto block min-h-11 rounded-full border border-white/60 px-3 text-sm font-bold text-white hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
        Wave to Kito
      </button>
      <QuestSoundToggle className="mx-auto mt-2 flex border-white/60 text-white hover:bg-white/15" />
      <span role="status" className="sr-only">{wave > 0 && <span key={wave}>Kito says hello!</span>}</span>
    </div>
  );
}
