"use client";

import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import UploadModal from "@/components/UploadModal";

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
          <UploadModal />
          <div className="bg-dots flex [background-size:32px_32px]">
            <Sidebar />
            <main className="flex max-h-svh min-h-svh flex-1 flex-col overflow-hidden rounded-lg p-6 md:p-8 md:pl-80 lg:p-12 lg:pl-80">
              <Navbar />
              <div className="flex-1 overflow-y-auto rounded-2xl border bg-zinc-50 p-8 lg:p-12">
                {children}
              </div>
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
