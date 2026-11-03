"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { APP_VERSION_CODE } from "@/lib/company";

function nativeLog(name: string) {
  const native = (window as Window & { SchoolQuestNative?: { log?: (name: string) => void } }).SchoolQuestNative;
  native?.log?.(name);
}

export function FirebaseSignals() {
  const pathname = usePathname();

  useEffect(() => {
    nativeLog(`sq_${pathname.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "").slice(0, 28).toLowerCase() || "screen"}`);
    void (async () => {
      const { default: app, firebaseConfig } = await import("@/lib/firebase");
      if (!firebaseConfig.measurementId) return;
      const { getAnalytics, isSupported, logEvent } = await import("firebase/analytics");
      if (await isSupported()) logEvent(getAnalytics(app), "sq_screen");
    })().catch(() => undefined);
  }, [pathname]);

  useEffect(() => {
    const start = () => {
      void (async () => {
        try {
          const { default: app } = await import("@/lib/firebase");
          const { fetchAndActivate, getRemoteConfig, getValue } = await import("firebase/remote-config");
          const remote = getRemoteConfig(app);
          remote.settings = { minimumFetchIntervalMillis: 6 * 60 * 60 * 1000, fetchTimeoutMillis: 8000 };
          remote.defaultConfig = { latest_version_code: APP_VERSION_CODE };
          await fetchAndActivate(remote);
          const latest = Number(getValue(remote, "latest_version_code").asString() || APP_VERSION_CODE);
          if (latest > APP_VERSION_CODE) window.dispatchEvent(new Event("schoolquest:update"));
        } catch {
          // Remote Config stays quiet until it is enabled for this Firebase project.
        }
      })();
    };
    if ("requestIdleCallback" in window) {
      const idle = window.requestIdleCallback(start);
      return () => window.cancelIdleCallback(idle);
    }
    const timer = globalThis.setTimeout(start, 2500);
    return () => globalThis.clearTimeout(timer);
  }, []);

  return null;
}
