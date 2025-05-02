import { auth } from "@/auth"



import { writeToken } from "./app/actions/actions";
import { NextResponse } from "next/server";

export default auth((req) => {
  console.log("MIDDLEWARE" + req.url)
  console.log(req.auth)
  if (req.auth) {
    console.log("NO REDIRECT")
    writeToken()
    return NextResponse.next();
  } else {
    console.log("REDIRECT")
    return NextResponse.redirect(new URL("/api/auth/signin", req.url)); // ✅ This is correct


  }
})
export const config = {
  matcher: ["/chat", "/inventory", "/viewNote", "/addNote"],
}