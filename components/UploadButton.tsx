"use client";

import { useUploadModal } from "@/hooks/use-upload-modal";
import React from "react";

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
    <button className={className} onClick={onOpen}>
      {label}
    </button>
  );
};

export default UploadButton;
