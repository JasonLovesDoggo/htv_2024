import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/components/modals/ModalProvider";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ModalProvider />
      <Toaster richColors theme="dark" position="bottom-center" />
      <div className="flex bg-dots [background-size:32px_32px]">
        <Sidebar />
        <Navbar />
        <main className="flex max-h-svh min-h-svh flex-1 flex-col overflow-hidden rounded-lg p-6 max-md:pt-24 md:p-8 md:pl-80 lg:p-12 lg:pl-80">
          <div className="flex-1 overflow-y-auto rounded-2xl border bg-zinc-50 p-8 lg:p-12">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
