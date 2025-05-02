import { auth } from "@/auth"



import {writeToken } from "./app/actions/actions";
import { NextResponse } from "next/server";

export default auth((req) => {
  console.log("MIDDLEWARE")
  console.log(req.auth)
  if (req.auth) {
    writeToken()
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL('/', req.url));
  }
})
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|/).*)"],
}