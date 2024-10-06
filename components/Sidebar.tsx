"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Upload, Vault } from "lucide-react";

import { navLinks } from "@/lib/config/site";
import { cn } from "@/lib/utils";

import UploadButton from "./UploadButton";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed left-0 flex h-full w-80 flex-col justify-between px-8 py-12 max-md:hidden">
      {/* Logo */}
      <Link href="/" className="mb-12 flex items-center gap-2.5">
        <Vault strokeWidth={2.5} className="size-7 text-rose-500" />
        <h1 className="text-xl font-black tracking-widest text-gray-800 md:text-2xl">
          PUT
        </h1>
      </Link>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-4 rounded-xl px-4 py-2 text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-800",
              {
                "bg-zinc-200 font-semibold tracking-wider text-black hover:bg-zinc-200 hover:text-black":
                  isActive(link.href),
              },
            )}
          >
            <link.icon className="size-5" />
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Upload Button at the bottom */}
      <div className="mt-auto">
        <UploadButton className="w-full bg-gray-50" />
      </div>
    </div>
  );
};

export default Sidebar;
