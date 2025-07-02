// app/api/auth/[...nextauth]/route.ts (or /auth.ts if using RSC-style setup)

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Optional: list of routes (but not needed here unless you use it in middleware)
const protectedRoutes = ["/inventory","chat", "viewNote", "addNote"];
const publicRoutes = ["/"];

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async authorized({ auth }) {
      console.log("authorized callback:", auth);
      return !!auth;
    },
    async redirect({ url, baseUrl }) {
      console.log("redirect callback:", url);
      // Prevent open redirect vulnerability
      return url.startsWith("/") ? `${baseUrl}${url}` : baseUrl;
    },
    async signIn({ user }) {
      console.log("signIn callback:", user.email);
      return true;
    },
  },
});