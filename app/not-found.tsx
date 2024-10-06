import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="mb-4 text-6xl font-bold text-gray-800 dark:text-gray-200">
        404
      </h1>
      <h2 className="mb-6 text-2xl font-semibold text-gray-600 dark:text-gray-400">
        Page Not Found
      </h2>
      <p className="mb-8 max-w-md text-center text-gray-600 dark:text-gray-400">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/dashboard">
        <Button variant="default" size="lg">
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
}
