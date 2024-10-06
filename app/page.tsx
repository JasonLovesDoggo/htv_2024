import Link from "next/link";
import { FaFolder, FaShareAlt, FaUpload } from "react-icons/fa";

import UploadButton from "@/components/UploadButton";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to SwiftLock
        </h1>
        <p className="text-lg text-gray-600">
          Quickly access and manage your files from one central location.
        </p>
        <hr />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link
          href="/files"
          className="flex items-center rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
        >
          <FaFolder className="mr-4 text-3xl text-blue-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Your Files</h2>
            <p className="text-gray-600">View and manage all your files</p>
          </div>
        </Link>
        <Link
          href="/shared"
          className="flex items-center rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
        >
          <FaShareAlt className="mr-4 text-3xl text-green-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Shared Files
            </h2>
            <p className="text-gray-600">Access files shared with you</p>
          </div>
        </Link>
        <UploadButton className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
          <button className="flex items-center">
            <FaUpload className="mr-4 text-3xl text-purple-500" />
            <div className="text-left">
              <h2 className="text-xl font-semibold text-gray-800">Upload</h2>
              <p className="text-gray-600">Upload new files to your storage</p>
            </div>
          </button>
        </UploadButton>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Recent Activity
        </h2>
        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-gray-600">No recent activity to display.</p>
        </div>
      </div>
    </div>
  );
}
