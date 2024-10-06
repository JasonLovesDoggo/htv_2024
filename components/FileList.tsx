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

interface FolderStructure {
  [key: string]: FolderStructure | File;
}

const FileList = async ({ search, filter }: FileListProps) => {
  const filteredFiles = await getFiles(search, filter);
  const folderStructure = organizeFiles(filteredFiles);

  return (
    <div className="overflow-x-auto">
      {filteredFiles.length > 0 ? (
        <FileListTable folderStructure={folderStructure} />
      ) : (
        <NoFilesFound />
      )}
    </div>
  );
};

const organizeFiles = (files: File[]): FolderStructure => {
  const structure: FolderStructure = {};

  files.forEach((file) => {
    const parts = file.name.split("/");
    let current = structure;

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        current[part] = file;
      } else {
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part] as FolderStructure;
      }
    });
  });

  return structure;
};

const FileListTable = ({
  folderStructure,
}: {
  folderStructure: FolderStructure;
}) => (
  <Table className="min-w-full">
    <TableHeader>
      <TableRow
        className="grid grid-cols-4 gap-4 border-b border-gray-300 bg-gray-50 hover:bg-gray-200"
        style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
      >
        <TableHead className="px-3 text-left font-medium">Name</TableHead>
        <TableHead className="px-3 text-center font-medium">
          File type
        </TableHead>
        <TableHead className="px-3 text-center font-medium">
          Last modified
        </TableHead>
        <TableHead className="px-3 text-left font-medium">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <RenderFolder structure={folderStructure} level={0} />
    </TableBody>
  </Table>
);

const RenderFolder = ({
  structure,
  level,
}: {
  structure: FolderStructure;
  level: number;
}) => {
  return (
    <>
      {Object.entries(structure).map(([name, item]) => {
        if (isFile(item)) {
          return (
            <FileRow key={item.id} file={item} level={level} isFolder={false} />
          );
        } else {
          const folderFile: File = {
            id: name,
            name,
            type: "folder",
            owner: "",
            lastModified: new Date().toISOString(),
            url: "",
            size: 0,
          };
          return (
            <FileRow key={name} file={folderFile} level={level} isFolder={true}>
              <RenderFolder structure={item} level={level + 1} />
            </FileRow>
          );
        }
      })}
    </>
  );
};

// Type guard to check if an item is a File
function isFile(item: FolderStructure | File): item is File {
  return (item as File).url !== undefined;
}

export default FileList;
