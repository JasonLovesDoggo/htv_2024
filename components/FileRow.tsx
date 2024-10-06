"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

import { type FileType } from "@/lib/data/file";
import { cn, formatReadableDate } from "@/lib/utils";
import { TableCell, TableRow } from "@/components/ui/table";

import FileActionsDropdown from "./FileActionsDropdown";

interface FileRowProps {
  file: FileType;
  level: number;
  isFolder?: boolean;
  children?: React.ReactNode;
}

const FileRow = ({ file, level, isFolder = false, children }: FileRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      {/* TableRow content */}
      <TableRow
        onClick={isFolder ? handleToggle : undefined}
        role={isFolder ? "button" : undefined}
        className={cn(
          "grid w-full grid-cols-4 items-center gap-4 border-b border-gray-200 transition-colors duration-150",
          {
            "hover:bg-gray-50": !isFolder,
            "border-b-px cursor-pointer rounded-md border-2 border-green-500 bg-green-100 hover:bg-green-200":
              isFolder,
          },
        )}
        style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
      >
        <TableCell className="px-3 py-5 font-medium text-gray-800">
          <div
            className="flex items-center"
            style={{ paddingLeft: `${level * 20}px` }}
          >
            {isFolder ? (
              <button className="flex items-center focus:outline-none">
                <span
                  className={cn("mr-2 transition-transform", {
                    "rotate-180": isExpanded,
                  })}
                >
                  <ChevronDown className="h-4 w-4" />
                </span>
                <p className="text-black">{file.name}</p>
              </button>
            ) : (
              <a
                href={file.url}
                target="_blank"
                className="text-blue-600 hover:underline"
                download={file.name}
              >
                {file.name.split("/").pop()}
              </a>
            )}
          </div>
        </TableCell>

        {/* File type */}
        <TableCell className="py-4 text-center">
          <span
            className={cn(
              "rounded-full bg-gray-100 px-4 py-1 text-sm font-semibold capitalize text-gray-700",
              {
                "bg-green-200 text-black": file.type === "folder",
              },
            )}
          >
            {file.type}
          </span>
        </TableCell>

        {/* Last modified */}
        <TableCell className="px-3 py-5 text-center text-gray-600">
          {formatReadableDate(file.lastModified.toISOString())}
        </TableCell>

        {/* Action buttons / dropdown */}
        <TableCell className="px-3 py-5">
          {!isFolder && <FileActionsDropdown file={file} />}
        </TableCell>
      </TableRow>

      {/* Conditionally render children for folders */}
      {isFolder && isExpanded && (
        <tr>
          <td colSpan={4}>
            <div className="pl-6">{children}</div>
          </td>
        </tr>
      )}
    </>
  );
};

export default FileRow;
