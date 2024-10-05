import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFiles } from "@/lib/data/file";
import FileRow from "./FileRow";

interface FileListProps {
  search: string;
  filter: string;
}

const FileList = async ({ search, filter }: FileListProps) => {
  const filteredFiles = await getFiles(search, filter);

  return (
    <div className="overflow-x-auto">
      {filteredFiles.length > 0 ? (
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="border-b border-gray-300">
              <TableHead className="px-3 py-5 text-left font-medium">
                Name
              </TableHead>
              <TableHead className="px-3 py-5 text-left font-medium">
                File type
              </TableHead>
              <TableHead className="px-3 py-5 text-left font-medium">
                Owner
              </TableHead>
              <TableHead className="px-3 py-5 text-left font-medium">
                Last modified
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFiles.map((file) => (
              <FileRow key={file.name} file={file} />
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="w-fit rounded-lg border bg-gray-100 p-8">
          <p className="mb-2 text-lg font-medium text-gray-700">
            No files found
          </p>
          <p className="text-sm text-gray-500">
            Try adjusting your search criteria or filters to find what
            you&apos;re looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default FileList;
