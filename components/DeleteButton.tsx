"use client";

import React from "react";
import { Trash2 } from "lucide-react"; // Use lucide-react icons
import { type File } from "@/lib/data/file";

interface DeleteButtonProps {
  file: File;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ file }) => {
  const onDelete = (file: File) => {
    console.log("Deleting file:", file.name);
  };

  return (
    <button
      className="flex items-center justify-center rounded-md border border-red-500 bg-red-500/10 px-3 py-2 text-red-600 transition-colors duration-150 hover:bg-red-500/20"
      onClick={() => onDelete(file)}
    >
      <Trash2 className="mr-1 h-4 w-4" />
      Delete
    </button>
  );
};

export default DeleteButton;
