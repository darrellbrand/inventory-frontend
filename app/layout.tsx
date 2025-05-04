
import "./globals.css";
import Navbar from "../components/Navbar";
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from 'next-themes'
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Metadata } from "next";



export const metadata : Metadata = {
  title: "RTFM",
  description: "Software developer loungs",
  
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body>
        <SessionProvider>
          <SidebarProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <AppSidebar />
              <Navbar></Navbar>
              <main className="w-screen h-screen">
                {children}
              </main>
            </ThemeProvider>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
