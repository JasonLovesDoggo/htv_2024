"use client";

import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/hooks/use-sidebar";
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
        <SidebarProvider>
          <div className="flex">
            <Sidebar />
            <main className="flex min-h-svh flex-1 flex-col rounded-lg p-6 md:p-8 md:pl-80 lg:p-12 lg:pl-80">
              <Navbar />
              <div className="flex-1 rounded-2xl border bg-zinc-50 p-8 lg:p-12">
                {children}
              </div>
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
