import React from "react";
import Link from "next/link";
import { Github } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="shadow-custom mt-auto bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            © 2024 File Storage Dashboard. All rights reserved.
          </p>
          <nav className="flex items-center space-x-8">
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Contact Us
            </Link>
            <Link href={""}>
              <Github />
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
