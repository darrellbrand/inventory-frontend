import { auth } from "@/auth"



import { NextRequest, NextResponse } from 'next/server';
export { auth as middleware } from "@/auth"

const username = 'dj';
const password = 'password';
const authString = btoa(`${username}:${password}`);
 
export const config = {
  matcher: [ "/((?!api|_next/static|_next/image|favicon.ico|home).*)"],
}