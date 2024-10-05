import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { type File } from "@/lib/data/file";
import FileActionsDropdown from "./FileActionsDropdown";

interface FileRowProps {
  file: File;
}

const FileRow = ({ file }: FileRowProps) => {
  return (
    <TableRow
      className="grid grid-cols-5 items-center gap-4 border-b border-gray-200 transition-colors duration-150 hover:bg-gray-50"
      style={{ gridTemplateColumns: "repeat(5, 1fr)" }} // Ensures even distribution of columns
    >
      <TableCell className="px-3 py-5 font-medium text-gray-800">
        {file.name}
      </TableCell>
      <TableCell className="py-4 text-center">
        <span className="rounded-full bg-gray-100 px-4 py-1 text-sm font-semibold capitalize text-gray-700">
          {file.type}
        </span>
      </TableCell>
      <TableCell className="px-3 py-5 text-center text-gray-600">
        {file.owner}
      </TableCell>
      <TableCell className="px-3 py-5 text-center text-gray-600">
        {file.lastModified}
      </TableCell>

      {/* Action buttons / dropdown */}
      <TableCell className="px-3 py-5">
        <FileActionsDropdown file={file} />
      </TableCell>
    </TableRow>
  );
};

export default FileRow;
