import React from "react";
import { FaFile, FaUserCircle, FaEllipsisV } from "react-icons/fa";

type SharedFile = {
  id: string;
  name: string;
  sharedWith: string[];
  size: string;
  modifiedDate: string;
};

const mockSharedFiles: SharedFile[] = [
  {
    id: "1",
    name: "Project Proposal.docx",
    sharedWith: ["User1", "User2", "User3", "User4"],
    size: "1.2 MB",
    modifiedDate: "2023-04-01",
  },
  {
    id: "2",
    name: "Budget.xlsx",
    sharedWith: ["User2", "User3"],
    size: "756 KB",
    modifiedDate: "2023-04-02",
  },
  {
    id: "3",
    name: "Presentation.pptx",
    sharedWith: ["User1", "User4"],
    size: "3.5 MB",
    modifiedDate: "2023-04-03",
  },
];

const SharedFileList: React.FC = () => {
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
              Shared With
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
          {mockSharedFiles.map((file) => (
            <tr key={file.id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center">
                  <FaFile className="h-5 w-5 flex-shrink-0 text-blue-500" />
                  <span className="ml-4 text-sm font-medium text-gray-900">
                    {file.name}
                  </span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center space-x-2">
                  {file.sharedWith.slice(0, 3).map((user, index) => (
                    <FaUserCircle
                      key={index}
                      className="h-6 w-6 text-gray-400"
                    />
                  ))}
                  {file.sharedWith.length > 3 && (
                    <span className="text-sm text-gray-500">
                      +{file.sharedWith.length - 3} more
                    </span>
                  )}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {file.size}
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

export default SharedFileList;
