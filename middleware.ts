import { auth } from "@/auth"



import { getToken, writeToken } from "./app/actions/actions";
import { NextResponse } from "next/server";


const username = 'dj';
const password = 'password';
const authString = btoa(`${username}:${password}`);
export default auth((req) => {
  console.log("MIDDLEWARE")
  if (req.auth) {
    
    writeToken()
  } else {
    return NextResponse.redirect(new URL('/', req.url));
  }
})
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|home).*)"],
}