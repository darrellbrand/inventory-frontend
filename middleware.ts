

import { auth } from "@/auth"
const protectedRoutes = ['/inventory']
const publicRoutes = ['/home']


export default auth((req) => {
  if (!req.auth && protectedRoutes.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/home", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})