"use client";

import { useUploadModal } from "@/hooks/use-upload-modal";
import React from "react";

const UploadModal: React.FC = () => {
  const { isOpen, onClose } = useUploadModal();

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Upload File</h2>
          {/* Add your upload form or content here */}
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
