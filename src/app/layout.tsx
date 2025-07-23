import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Auris",
  description: "Ear trainer platform"
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className="h-full min-h-screen">
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
