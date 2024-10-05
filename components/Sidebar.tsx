"use client";

import { navLinks } from "@/lib/config/site";
import { cn } from "@/lib/utils";
import { Vault } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  //   const { isOpen, onClose } = useSidebar();

  const isActive = (path: string) => pathname === path;

  return (
    <div
      className={cn(
        "fixed left-0 h-full w-80 bg-white px-8 py-10 max-md:hidden",
      )}
    >
      {/* Logo */}
      <Link href="/" className="mb-12 flex items-center gap-2.5">
        <Vault className="size-7" />
        <h1 className="text-xl font-bold text-gray-800">SwiftLock</h1>
      </Link>

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
    </div>
  );
};

export default Sidebar;
