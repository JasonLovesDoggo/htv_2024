import React from "react";
import { FaFolder, FaFile, FaEllipsisV } from "react-icons/fa";

type File = {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: string;
  modifiedDate: string;
};

const mockFiles: File[] = [
  { id: "1", name: "Documents", type: "folder", modifiedDate: "2023-04-01" },
  { id: "2", name: "Images", type: "folder", modifiedDate: "2023-04-02" },
  {
    id: "3",
    name: "report.pdf",
    type: "file",
    size: "2.5 MB",
    modifiedDate: "2023-04-03",
  },
  {
    id: "4",
    name: "presentation.pptx",
    type: "file",
    size: "5.1 MB",
    modifiedDate: "2023-04-04",
  },
];

const FileList: React.FC = () => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Size
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Modified
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {mockFiles.map((file) => (
            <tr key={file.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center">
                  {file.type === "folder" ? (
                    <FaFolder className="h-5 w-5 flex-shrink-0 text-yellow-400" />
                  ) : (
                    <FaFile className="h-5 w-5 flex-shrink-0 text-blue-500" />
                  )}
                  <span className="ml-4 text-sm font-medium text-gray-900">
                    {file.name}
                  </span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {file.size || "-"}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {file.modifiedDate}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <button className="text-gray-400 hover:text-gray-500">
                  <FaEllipsisV />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;
