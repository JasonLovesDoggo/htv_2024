"use client";

import React from "react";
import { Edit } from "lucide-react";

import { FileType } from "@/lib/data/file";
import { useModal } from "@/hooks/use-modal";

interface EditButtonProps {
  file: FileType;
}

const EditButton: React.FC<EditButtonProps> = ({ file }) => {
  const modal = useModal();

  return (
    <button
      className="flex items-center justify-center rounded-md border border-blue-500 bg-blue-500/10 px-3 py-2 text-blue-600 transition-colors duration-150 hover:bg-blue-500/20"
      onClick={() => modal.onOpen("edit", file)}
    >
      <Edit className="mr-1 h-4 w-4" />
      Edit
    </button>
  );
};

export default EditButton;
