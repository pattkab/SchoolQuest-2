"use client";

import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { GoogleAuthProvider, getAuth, getRedirectResult, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { completeGoogleSignIn } from "@/app/actions/google";
import app from "@/lib/firebase";

let redirectOnce: Promise<void> | null = null;

function finishRedirect() {
  if (!redirectOnce) {
    redirectOnce = (async () => {
      const result = await getRedirectResult(getAuth(app));
      if (!result) return;
      const idToken = await result.user.getIdToken();
      await completeGoogleSignIn(idToken);
    })();
  }
  return redirectOnce;
}

export function GoogleSignInButton() {
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    finishRedirect().catch((error) => {
      const digest = (error as { digest?: string })?.digest || "";
      if (digest.startsWith("NEXT_REDIRECT")) return;
      setFailed(true);
      setPending(false);
    });
  }, []);

  return (
    <div className="w-full">
      <button
        type="button"
        disabled={pending}
        className="w-full min-h-12 rounded-2xl border bg-white font-bold disabled:opacity-60 inline-flex items-center justify-center gap-3 hover:bg-muted transition-colors"
        onClick={async () => {
          setPending(true);
          setFailed(false);
          const auth = getAuth(app);
          const provider = new GoogleAuthProvider();
          provider.addScope("profile");
          provider.setCustomParameters({ prompt: "select_account" });
          try {
            if (Capacitor.isNativePlatform()) {
              await signInWithRedirect(auth, provider);
              return;
            }
            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();
            await completeGoogleSignIn(idToken);
          } catch (error) {
            const code = (error as { code?: string })?.code || "";
            const digest = (error as { digest?: string })?.digest || "";
            if (digest.startsWith("NEXT_REDIRECT")) return;
            if (code === "auth/popup-blocked" || code === "auth/operation-not-supported-in-this-environment") {
              try {
                await signInWithRedirect(auth, provider);
                return;
              } catch {
                setFailed(true);
                setPending(false);
                return;
              }
            }
            if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
              setPending(false);
              return;
            }
            setFailed(true);
            setPending(false);
          }
        }}
      >
        <span aria-hidden="true" className="text-lg font-extrabold text-blue-600">G</span>
        {pending ? "Opening Google…" : "Continue with Google"}
      </button>
      {failed && (
        <p className="mt-3 rounded-2xl bg-red-50 text-red-700 px-4 py-3 text-sm font-semibold">
          Google could not open this account. Use your phone and PIN, or try Google again.
        </p>
      )}
    </div>
  );
}
