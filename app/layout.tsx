"use client";

import "./globals.css";

import { Space_Grotesk } from "next/font/google";

import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/hooks/use-sidebar";
import EditModal from "@/components/modals/EditModal";
import ModalProvider from "@/components/modals/ModalProvider";
import UploadModal from "@/components/modals/UploadModal";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

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
          <ModalProvider />
          <div className="flex bg-dots [background-size:32px_32px]">
            <Sidebar />
            <Navbar />
            <main className="flex max-h-svh min-h-svh flex-1 flex-col overflow-hidden rounded-lg p-6 max-md:pt-24 md:p-8 md:pl-80 lg:p-12 lg:pl-80">
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
