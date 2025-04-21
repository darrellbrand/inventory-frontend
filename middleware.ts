import { auth } from "@/auth"
import { cookies } from "next/headers"


import { NextRequest, NextResponse } from 'next/server';
export { auth as middleware } from "@/auth"
import { NextApiRequest, NextApiResponse } from 'next';
import { setToken, TokenResponse } from './app/actions/actions';
import { error } from 'console';
const username = 'dj';
const password = 'password';
const authString = btoa(`${username}:${password}`);

export default auth( (req) => {
  console.log(req.url + "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
  if(req.url == "/home"){

  }

})
export const config = {
  matcher: ["/inventory", "/((?!api|_next/static|_next/image|favicon.ico|home).*)"],
}