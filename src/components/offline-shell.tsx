"use client";

import { useEffect, useState } from "react";

export function OfflineShell() {
  const [updateReady, setUpdateReady] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    let cancelled = false;
    navigator.serviceWorker.register("/sw.js").then((registration) => {
      registration.addEventListener("updatefound", () => {
        const worker = registration.installing;
        worker?.addEventListener("statechange", () => {
          if (!cancelled && worker.state === "installed" && navigator.serviceWorker.controller) setUpdateReady(true);
        });
      });
    }).catch(() => undefined);
    return () => { cancelled = true; };
  }, []);

  if (!updateReady) return null;
  return (
    <p className="fixed bottom-20 left-3 right-3 z-40 mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl bg-[#1b2940] px-4 py-3 text-sm font-bold text-white">
      A new School Quest is ready.
      <button type="button" className="rounded-full bg-white px-3 py-2 text-[#1b2940]" onClick={() => window.location.reload()}>Update</button>
    </p>
  );
}
