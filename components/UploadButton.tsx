"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { useUploadModal } from "@/hooks/use-upload-modal";

type Props = {
  children?: React.ReactNode;
  label?: string;
  className?: string;
};

const UploadButton: React.FC<Props> = ({
  children,
  label = "Upload",
  className,
}) => {
  const { onOpen } = useUploadModal();

  if (children) {
    return (
      <div className={className} onClick={onOpen}>
        {children}
      </div>
    );
  }

  return (
    <button
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-white px-4 py-2 font-medium transition-colors hover:text-white active:scale-95",
        className,
      )}
      onClick={onOpen}
    >
      <span className="absolute bottom-0 left-1/2 size-32 -translate-x-1/2 translate-y-1/2 scale-x-0 scale-y-0 rounded-full bg-black transition-transform duration-300 group-hover:scale-x-100 group-hover:scale-y-100" />
      <span className="relative">{label}</span>
    </button>
  );
};

export default UploadButton;
