import SharedFileList from "@/components/SharedFileList";
import { FaShareAlt } from "react-icons/fa";

export default function Shared() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Shared Files</h1>
        <button className="inline-flex items-center rounded bg-blue-500 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-600">
          <FaShareAlt className="mr-2" />
          Share New File
        </button>
      </div>
      <SharedFileList />
    </div>
  );
}
