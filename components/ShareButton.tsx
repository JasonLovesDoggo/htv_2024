"use client";

import React from "react";
import { Share2 } from "lucide-react"; // Use lucide-react icons

import { type File } from "@/lib/data/file";
import { useModal } from "@/hooks/use-modal";

interface ShareButtonProps {
  file: File;
}

const ShareButton: React.FC<ShareButtonProps> = ({ file }) => {
  const modal = useModal();

  const handleShare = () => {
    modal.onOpen("share", file);
  };

  return (
    <button
      className="flex items-center justify-center rounded-md border border-green-500 bg-green-500/10 px-3 py-2 text-green-600 transition-colors duration-150 hover:bg-green-500/20"
      onClick={handleShare}
    >
      <Share2 className="mr-1 h-4 w-4" />
      Share
    </button>
  );
};

export default ShareButton;
