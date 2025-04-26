import { auth } from "@/auth"



import { getToken, writeToken } from "./app/actions/actions";
export { auth as middleware } from "@/auth"

const username = 'dj';
const password = 'password';
const authString = btoa(`${username}:${password}`);
export default auth((req) => {
  
    const token =  getToken()
  
})
export const config = {
  matcher: [ "/((?!api|_next/static|_next/image|favicon.ico|home).*)"],
}