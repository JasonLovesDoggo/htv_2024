"use client";

import { FaBars } from "react-icons/fa";

import { useSidebar } from "@/hooks/use-sidebar";

const Navbar: React.FC = () => {
  const { onOpen } = useSidebar();

  return (
    <nav className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between bg-gray-100 px-4 py-3 shadow-md md:hidden">
      <div className="flex items-center">
        <span className="ml-2 text-lg font-bold text-gray-800">
          File Storage
        </span>
      </div>
      <button
        className="rounded-md bg-gray-200 p-2 text-gray-600 hover:bg-gray-300"
        onClick={onOpen}
      >
        <FaBars className="h-6 w-6" />
      </button>
    </nav>
  );
};

export default Navbar;
