'use client'
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Navbar";
import { SessionProvider } from "next-auth/react"




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
        <SessionProvider>
          <Navbar></Navbar>
          {children}
          </SessionProvider>
        </body>
    </html>
  );
}
