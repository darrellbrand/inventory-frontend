

import { auth } from "@/auth"
const protectedRoutes = ['/inventory']
const publicRoutes = ['/login', '/register', '/home','/']


export default auth((req) => {
  console.log("FFFFLLLLL")
  if (!req.auth && protectedRoutes.includes(req.nextUrl.pathname)) {
    console.log(req.nextUrl.pathname)
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})