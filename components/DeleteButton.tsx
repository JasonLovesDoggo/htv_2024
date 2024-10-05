"use client";

import React from "react";
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
      className="rounded-md bg-red-500 px-4 py-2 text-white transition-colors duration-150 hover:bg-red-600"
      onClick={() => onDelete(file)}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
