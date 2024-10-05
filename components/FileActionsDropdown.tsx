"use client";

import React from "react";
import { Edit3, MoreVertical, Share2, Trash2 } from "lucide-react";

import { type File } from "@/lib/data/file";
import { useModal } from "@/hooks/use-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import ShareButton from "./ShareButton";

interface FileActionsDropdownProps {
  file: File;
}

const FileActionsDropdown = ({ file }: FileActionsDropdownProps) => {
  const modal = useModal();

  return (
    <div className="flex items-center justify-center">
      <div className="hidden items-center justify-center space-x-2 xl:flex">
        <EditButton file={file} />
        <DeleteButton file={file} />
        <ShareButton file={file} />
      </div>

      <div className="flex items-center justify-center xl:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full p-2 text-gray-600 hover:bg-gray-200">
              <MoreVertical className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-44 rounded-lg bg-white shadow-md"
            align="start"
          >
            {/* Edit Action */}
            <DropdownMenuItem
              onClick={() => modal.onOpen("edit", file)}
              className="flex items-center space-x-2 text-blue-600 hover:bg-black"
            >
              <Edit3 className="h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>

            {/* Delete Action */}
            <DropdownMenuItem
              onClick={() => modal.onOpen("delete", file)}
              className="flex items-center space-x-2 text-red-600 hover:bg-red-500"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>

            {/* Share Action */}
            <DropdownMenuItem
              onClick={() => modal.onOpen("share", file)}
              className="flex items-center space-x-2 text-green-600 hover:bg-green-50"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FileActionsDropdown;
