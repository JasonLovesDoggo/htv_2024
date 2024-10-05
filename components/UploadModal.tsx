"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadModal } from "@/hooks/use-upload-modal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UploadCloud } from "lucide-react";

const UploadModal: React.FC = () => {
  const { isOpen, onClose } = useUploadModal();
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // If we want to allow multiple files, set this to true
  });

  const handleUpload = () => {
    if (files.length > 0) {
      const file = files[0];
      console.log("Uploading file:", file.name);
      setFiles([]);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:p-8">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Drag and drop a file or click to select one.
          </DialogDescription>
        </DialogHeader>
        <div
          {...getRootProps()}
          className={`rounded-lg border-2 border-dashed p-6 ${
            isDragActive ? "border-blue-500" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-blue-500">Drop the file here...</p>
          ) : (
            <p className="text-center text-sm text-gray-600">
              Drag &apos;n&apos; drop a file here, or click to select one
            </p>
          )}
        </div>
        {files.length > 0 && (
          <div className="text-center text-sm text-gray-500">
            Selected file: {files[0].name}
          </div>
        )}
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleUpload}
            disabled={files.length === 0}
          >
            <UploadCloud className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
