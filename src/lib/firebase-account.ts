import { firebaseConfig } from "./firebase";

type GoogleAccount = { email: string; name: string };

export async function accountFromFirebaseToken(idToken: string): Promise<GoogleAccount | null> {
  if (!idToken || idToken.length < 20) return null;
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseConfig.apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    },
  );
  if (!res.ok) return null;
  const data = await res.json();
  const user = data.users?.[0];
  const google = (user?.providerUserInfo || []).some(
    (provider: { providerId?: string }) => provider.providerId === "google.com",
  );
  if (!google || !user?.email) return null;
  return { email: String(user.email), name: String(user.displayName || "Learner") };
}
