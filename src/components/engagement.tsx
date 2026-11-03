"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PLAY_STORE_URL, PRODUCTS_URL, SHARE_URL } from "@/lib/company";
import { X } from "lucide-react";

type Nudge = "pro" | "review" | "share" | "products" | "update";

const COPY: Record<Nudge, { title: string; body: string; action: string }> = {
  pro: { title: "Go Pro", body: "All papers, instant marking, and progress in one place.", action: "See plans" },
  review: { title: "How is School Quest?", body: "A short review helps another family find it.", action: "Rate it" },
  share: { title: "Pass it on", body: "Send School Quest to a learner or a teacher.", action: "Share" },
  products: { title: "More from Potentia Motus", body: "See the other products from the same team.", action: "Visit" },
  update: { title: "Update School Quest", body: "A newer version is ready on Google Play.", action: "Update" },
};

function seen(kind: Nudge) {
  return Number(localStorage.getItem(`sq-nudge-${kind}`) || 0);
}

function due(kind: Nudge, days: number) {
  return Date.now() - seen(kind) > days * 86_400_000;
}

function remember(kind: Nudge) {
  localStorage.setItem(`sq-nudge-${kind}`, String(Date.now()));
}

async function openShare() {
  const payload = { title: "School Quest", text: "Practice the Ugandan curriculum on School Quest.", url: SHARE_URL };
  if (navigator.share) await navigator.share(payload);
  else window.open(SHARE_URL, "_blank", "noopener,noreferrer");
  logNative("sq_share");
}

function logNative(name: string) {
  const native = (window as Window & { SchoolQuestNative?: { log?: (name: string) => void } }).SchoolQuestNative;
  native?.log?.(name);
}

export function Engagement() {
  const [nudge, setNudge] = useState<Nudge | null>(null);

  useEffect(() => {
    const show = (kind: Nudge) => {
      setNudge(kind);
      logNative("sq_prompt");
    };
    const open = window.setTimeout(() => {
      if (!sessionStorage.getItem("sq-session")) {
        sessionStorage.setItem("sq-session", "1");
        if (due("pro", 2)) return show("pro");
      }
      const next = (["review", "share", "products", "update"] as Nudge[]).find((kind) => due(kind, 12));
      if (next) show(next);
    }, 1600);
    const onTask = () => {
      if (due("pro", 1)) show("pro");
    };
    const onUpdate = () => show("update");
    window.addEventListener("schoolquest:task", onTask);
    window.addEventListener("schoolquest:update", onUpdate);
    return () => {
      window.clearTimeout(open);
      window.removeEventListener("schoolquest:task", onTask);
      window.removeEventListener("schoolquest:update", onUpdate);
    };
  }, []);

  if (!nudge) return null;
  const copy = COPY[nudge];
  const dismiss = () => {
    remember(nudge);
    setNudge(null);
  };
  const act = () => {
    remember(nudge);
    if (nudge === "share") void openShare();
    if (nudge === "review" || nudge === "update") window.open(PLAY_STORE_URL, "_blank", "noopener,noreferrer");
    if (nudge === "products") window.open(PRODUCTS_URL, "_blank", "noopener,noreferrer");
    setNudge(null);
  };

  return (
    <aside className="nudge" aria-label={copy.title}>
      <div>
        <p className="font-extrabold">{copy.title}</p>
        <p>{copy.body}</p>
      </div>
      <div className="flex items-center gap-2">
        {nudge === "pro" ? (
          <Link href="/dashboard/subscribe" className="quest-button quest-button-small" onClick={dismiss}>{copy.action}</Link>
        ) : (
          <button type="button" className="quest-button quest-button-small" onClick={act}>{copy.action}</button>
        )}
        <button type="button" className="icon-button" aria-label="Not now" onClick={dismiss}><X className="h-4 w-4" /></button>
      </div>
    </aside>
  );
}
