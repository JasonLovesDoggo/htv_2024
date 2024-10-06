import React from "react";

import { FileType, getFiles } from "@/lib/data/file";
import { Table, TableBody, TableHeader } from "@/components/ui/table";

import FileListHeader from "./FileListHeader";
import FileRow from "./FileRow";
import NoFilesFound from "./NoFilesFound";

interface FileListProps {
  search: string;
  filter: string;
  filterBy: string;
}

interface FolderStructure {
  [key: string]: FolderStructure | FileType;
}

const FileList = async ({ search, filter, filterBy }: FileListProps) => {
  const filteredFiles = await getFiles(search, filter, filterBy);
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

const organizeFiles = (files: FileType[]): FolderStructure => {
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
      <FileListHeader />
    </TableHeader>
    <TableBody className="space-y-1">
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
            <FileRow key={name} file={item} level={level} isFolder={false} />
          );
        } else {
          const folderFiles = Object.values(item).filter(isFile);
          const latestModifiedFile = folderFiles.reduce((latest, file) =>
            file.lastModified > latest.lastModified ? file : latest,
          );
          const folderFile: FileType = {
            name,
            type: "folder",
            lastModified: latestModifiedFile.lastModified,
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

// Type guard to check if an item is a FileType
function isFile(item: FolderStructure | FileType): item is FileType {
  return (item as FileType).url !== undefined;
}

export default FileList;
