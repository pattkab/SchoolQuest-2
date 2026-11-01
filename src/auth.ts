import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import { db } from "./lib/db";
import { accountFromFirebaseToken } from "./lib/firebase-account";
import { passwordMatches } from "./lib/password";

const googleReady = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    ...(googleReady
      ? [Google({ clientId: process.env.AUTH_GOOGLE_ID!, clientSecret: process.env.AUTH_GOOGLE_SECRET! })]
      : []),
    Credentials({
      name: "Phone Number",
      credentials: {
        phone: { label: "Phone Number", type: "text" },
        password: { label: "Password", type: "password" },
        intent: { label: "Intent", type: "text" },
        idToken: { label: "Firebase token", type: "text" },
      },
      async authorize(credentials) {
        const idToken = String(credentials?.idToken || "");
        if (idToken) {
          const account = await accountFromFirebaseToken(idToken);
          if (!account) return null;
          const row = await db.user.upsert({
            where: { email: account.email },
            update: {},
            create: {
              email: account.email,
              name: account.name,
              role: "STUDENT",
              profileComplete: false,
              trialStartsAt: new Date(),
              trialEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
            },
          });
          return {
            id: row.id,
            name: row.name,
            phone: row.phone || undefined,
            role: row.role,
          };
        }

        const phone = String(credentials?.phone || "").replace(/\s+/g, "");
        const password = String(credentials?.password || "");
        const intent = String(credentials?.intent || "STUDENT");
        if (!phone || !password) return null;

        const user = await db.user.findUnique({
          where: { phone },
          include: { teacherProfile: true },
        });

        if (!user || !passwordMatches(user.passwordHash, password)) return null;

        if (intent === "TEACHER" && user.role === "STUDENT") return null;
        if (intent === "ADMIN" && user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") return null;

        return {
          id: user.id,
          name: user.name,
          phone: user.phone || undefined,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ account, profile }) {
      if (account?.provider !== "google") return true;
      const email = profile?.email;
      if (!email) return false;
      const name = profile.name || "Learner";
      await db.user.upsert({
        where: { email },
        update: { name },
        create: {
          email,
          name,
          role: "STUDENT",
          profileComplete: false,
          trialStartsAt: new Date(),
          trialEndsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
        },
      });
      return true;
    },
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && user?.email) {
        const row = await db.user.findUnique({ where: { email: user.email } });
        if (row) {
          token.id = row.id;
          token.role = row.role;
          token.phone = row.phone;
          token.name = row.name;
        }
      } else if (user) {
        token.id = user.id;
        token.role = user.role;
        token.phone = user.phone;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.phone = token.phone as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});
