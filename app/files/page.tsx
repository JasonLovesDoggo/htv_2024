import FileList from "@/components/FileList";
import { FaFolderPlus, FaUpload } from "react-icons/fa";

export default function Files() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Your Files</h1>
        <div className="space-x-2">
          <button className="inline-flex items-center rounded bg-blue-500 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-600">
            <FaFolderPlus className="mr-2" />
            New Folder
          </button>
          <button className="inline-flex items-center rounded bg-green-500 px-4 py-2 font-bold text-white transition-colors hover:bg-green-600">
            <FaUpload className="mr-2" />
            Upload
          </button>
        </div>
      </div>
      <FileList />
    </div>
  );
}
