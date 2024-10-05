import React from "react";

import { File, getFiles } from "@/lib/data/file";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import FileRow from "./FileRow";
import NoFilesFound from "./NoFilesFound";

interface FileListProps {
  search: string;
  filter: string;
}

const FileList = async ({ search, filter }: FileListProps) => {
  const filteredFiles = await getFiles(search, filter);

  return (
    <div className="overflow-x-auto">
      {filteredFiles.length > 0 ? (
        <FileListTable files={filteredFiles} />
      ) : (
        <NoFilesFound />
      )}
    </div>
  );
};

const FileListTable = ({ files }: { files: File[] }) => (
  <Table className="min-w-full">
    <TableHeader>
      <TableRow
        className="grid grid-cols-5 gap-4 border-b border-gray-300 bg-gray-50 hover:bg-gray-200"
        style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
      >
        <TableHead className="px-3 text-left font-medium">Name</TableHead>
        <TableHead className="px-3 text-center font-medium">
          File type
        </TableHead>
        <TableHead className="px-3 text-center font-medium">Owner</TableHead>
        <TableHead className="px-3 text-center font-medium">
          Last modified
        </TableHead>
        <TableHead className="px-3 text-left font-medium">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {files.map((file) => (
        <FileRow key={file.name} file={file} />
      ))}
    </TableBody>
  </Table>
);

export default FileList;
