import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Phone Number",
      credentials: {
        phone: { label: "Phone Number", type: "text", placeholder: "07..." },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) return null;
        
        // Find user by phone
        const user = await db.user.findUnique({
          where: { phone: credentials.phone as string }
        });

        // For MVP Phase 1: auto-create if not found or verify password (skip password hashing for initial speed if desired, but let's mock it)
        if (!user) {
          // Auto-register for easy onboarding during this prototyping phase
          const trialEnds = new Date();
          trialEnds.setDate(trialEnds.getDate() + 3);

          const newUser = await db.user.create({
            data: {
              phone: credentials.phone as string,
              trialStartsAt: new Date(),
              trialEndsAt: trialEnds,
              // In production, HASH the password!
            }
          });
          return { id: newUser.id, phone: newUser.phone, role: newUser.role };
        }

        // Return user
        return { id: user.id, phone: user.phone || undefined, role: user.role } as any;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.phone = token.phone;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" }
});
