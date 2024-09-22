import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GoogleProvider from "next-auth/providers/google";
const protectedRoutes = ['/inventory']
const publicRoutes = ['/login', '/signup', '/']
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
  }
})


providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })
]

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}