
export { auth as middleware } from "@/auth"

export const config = {
  matcher: ["/inventory", "/((?!api|_next/static|_next/image|favicon.ico|home).*)"],
}