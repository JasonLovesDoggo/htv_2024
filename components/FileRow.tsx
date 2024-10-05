import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { type File } from "@/lib/data/file";
import DeleteButton from "./DeleteButton";

interface FileRowProps {
  file: File;
}

const FileRow: React.FC<FileRowProps> = ({ file }) => {
  return (
    <TableRow className="border-b border-gray-200 transition-colors duration-150 hover:bg-gray-50">
      <TableCell className="px-3 py-5 text-gray-800">{file.name}</TableCell>
      <TableCell className="px-6 py-4">
        <span className="rounded-full bg-gray-200 px-4 py-2 text-center text-sm font-semibold text-gray-700">
          {file.type}
        </span>
      </TableCell>
      <TableCell className="px-3 py-5 text-gray-600">{file.owner}</TableCell>
      <TableCell className="px-3 py-5 text-gray-600">
        {file.lastModified}
      </TableCell>
      <TableCell className="px-3 py-5 text-right">
        <DeleteButton file={file} />
      </TableCell>
    </TableRow>
  );
};

export default FileRow;
