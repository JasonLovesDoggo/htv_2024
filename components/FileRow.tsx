import React from "react";

import { type File } from "@/lib/data/file";
import { TableCell, TableRow } from "@/components/ui/table";

import FileActionsDropdown from "./FileActionsDropdown";

interface FileRowProps {
  file: File;
}

const FileRow = ({ file }: FileRowProps) => {
  const downloadUrl = `/api/file/download?name=${encodeURIComponent(file.name)}`;

  return (
    <TableRow
      className="grid grid-cols-5 items-center gap-4 border-b border-gray-200 transition-colors duration-150 hover:bg-gray-50"
      style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
    >
      {/* File name with download link */}
      <TableCell className="px-3 py-5 font-medium text-gray-800">
        <a
          href={file.url}
          target="_blank"
          className="text-blue-600 hover:underline"
          download={file.name}
        >
          {file.name}
        </a>
      </TableCell>

      {/* File type */}
      <TableCell className="py-4 text-center">
        <span className="rounded-full bg-gray-100 px-4 py-1 text-sm font-semibold capitalize text-gray-700">
          {file.type}
        </span>
      </TableCell>

      {/* File owner */}
      <TableCell className="px-3 py-5 text-center text-gray-600">
        {file.owner}
      </TableCell>

      {/* Last modified */}
      <TableCell className="px-3 py-5 text-center text-gray-600">
        {new Date(file.lastModified).toLocaleString()}
      </TableCell>

      {/* Action buttons / dropdown */}
      <TableCell className="px-3 py-5">
        <FileActionsDropdown file={file} />
      </TableCell>
    </TableRow>
  );
};

export default FileRow;
