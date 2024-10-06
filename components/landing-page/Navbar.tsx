import Link from "next/link";

import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="z-10 rounded-t-xl border-b bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4 md:px-6 lg:px-8">
        <div className="text-2xl font-bold">PUT</div>
        <div className="space-x-4 text-base lg:space-x-12">
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            How it works
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            Docs
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            Community
          </Link>
          <Button>
            <Link href={"/dashboard"}>Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
