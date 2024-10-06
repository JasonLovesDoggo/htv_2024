"use client";

import React from "react";
import { Trash2 } from "lucide-react"; // Use lucide-react icons

import { FileType } from "@/lib/data/file";
import { useModal } from "@/hooks/use-modal";

interface DeleteButtonProps {
  file: FileType;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ file }) => {
  const modal = useModal();

  return (
    <button
      className="flex items-center justify-center rounded-md border border-red-500 bg-red-500/10 px-3 py-2 text-red-600 transition-colors duration-150 hover:bg-red-500/20"
      onClick={() => modal.onOpen("delete", file)}
    >
      <Trash2 className="mr-1 h-4 w-4" />
      Delete
    </button>
  );
};

export default DeleteButton;
