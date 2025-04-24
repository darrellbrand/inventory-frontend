
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { SessionProvider } from "next-auth/react"

export const metadata = {
  title: "Baller Webapp",
  icons: {
    icon: "/favicon.ico", // or "/favicon.png" or any other icon file in public/
  },
};


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
