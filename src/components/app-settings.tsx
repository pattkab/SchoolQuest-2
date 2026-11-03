"use client";

import { useEffect, useState } from "react";
import { DATA_SAVER_KEY, dataSaverEnabled } from "@/components/students-photo";
import { suggestFeature } from "@/app/actions/feedback";
import { COMPANY_LINE, HOWTO_YOUTUBE_URL, PLAY_STORE_URL, PRODUCTS_URL, SHARE_URL, WHATSAPP_PHONE, WHATSAPP_URL } from "@/lib/company";

export function AppSettings({ sent }: { sent?: string }) {
  const [open, setOpen] = useState(false);
  const [saver, setSaver] = useState(false);
  useEffect(() => setSaver(dataSaverEnabled()), []);
  const toggleSaver = () => {
    const next = !saver;
    localStorage.setItem(DATA_SAVER_KEY, next ? "1" : "0");
    setSaver(next);
    window.dispatchEvent(new Event("schoolquest:data-saver"));
  };
  const share = async () => {
    const payload = { title: "School Quest", text: "Practice the Ugandan curriculum on School Quest.", url: SHARE_URL };
    if (navigator.share) await navigator.share(payload);
    else window.open(SHARE_URL, "_blank", "noopener,noreferrer");
  };
  return (
    <section className="quest-panel space-y-3">
      {sent === "sent" && <p className="text-sm font-bold text-[#0c634d]">Suggestion received.</p>}
      {sent === "short" && <p className="text-sm font-bold">Add a few words so we know what you need.</p>}
      <div className="settings-list">
        <button type="button" onClick={() => window.dispatchEvent(new Event("schoolquest:accessibility"))}>Text size and reading</button>
        <button type="button" aria-pressed={saver} onClick={toggleSaver}>{saver ? "Data saver on" : "Data saver off"}</button>
        <button type="button" onClick={() => setOpen((value) => !value)}>Suggest a feature</button>
        {HOWTO_YOUTUBE_URL && <a href={HOWTO_YOUTUBE_URL} target="_blank" rel="noreferrer">How to use School Quest</a>}
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp {WHATSAPP_PHONE}</a>
        <a href={PRODUCTS_URL} target="_blank" rel="noreferrer">Potentia Motus products</a>
        <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer">Check for updates</a>
        <button type="button" onClick={() => void share()}>Share School Quest</button>
        <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer">Rate School Quest</a>
      </div>
      {open && (
        <form action={suggestFeature} className="space-y-2">
          <input type="hidden" name="returnTo" value="/dashboard/settings" />
          <label className="text-sm font-bold" htmlFor="suggestion">Suggest a feature</label>
          <textarea id="suggestion" name="message" required minLength={4} rows={3} className="w-full rounded-2xl border px-3 py-2" placeholder="What should School Quest do next?" onDoubleClick={(event) => event.currentTarget.select()} />
          <button className="quest-button quest-button-small" type="submit">Send</button>
        </form>
      )}
      <p className="text-sm leading-snug">{COMPANY_LINE}</p>
    </section>
  );
}
