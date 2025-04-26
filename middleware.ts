import { auth } from "@/auth"



import { getToken, writeToken } from "./app/actions/actions";


const username = 'dj';
const password = 'password';
const authString = btoa(`${username}:${password}`);
export default auth((req) => {
  console.log("MIDDLEWARE")
     return  writeToken(req)
  
})
export const config = {
  matcher: [ "/((?!api|_next/static|_next/image|favicon.ico|home).*)"],
}