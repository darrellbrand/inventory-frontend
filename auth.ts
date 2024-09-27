import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/dist/server/api-utils";
const protectedRoutes = ['/inventory']
const publicRoutes = ['/login', '/signup', '/']
export const { handlers, signIn, signOut, auth } = NextAuth({
  
  providers: [Google],
  callbacks: {
    authorized: async ({ auth }) => {
      console.log('authorized callback' + auth!!)
      return !!auth
    },
    redirect: async({url, baseUrl}) =>{
      console.log('redirect callback' + url)
      return url
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log('signIn callback' + user.email)
      return true
    },
  }
  
})

 providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  })
 
]

