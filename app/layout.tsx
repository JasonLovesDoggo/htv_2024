"use client";

import "./globals.css";

import { Space_Grotesk } from "next/font/google";

import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-svh", spaceGrotesk.className)}>
        {children}
      </body>
    </html>
  );
}
