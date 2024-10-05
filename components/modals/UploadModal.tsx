"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { UploadFormSchema, uploadSchema } from "@/lib/validators/file";
import { useModal } from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import UploadForm from "../forms/UploadForm";

const UploadModal = () => {
  const { isOpen, modalType, onClose } = useModal();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const form = useForm<UploadFormSchema>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      name: "",
      file: undefined,
    },
  });

  // Retrieve the uploaded file data from local storage when the modal is opened
  useEffect(() => {
    if (isOpen && modalType === "upload") {
      const storedData = localStorage.getItem("uploadedFile");
      if (storedData) {
        const { name, file } = JSON.parse(storedData);
        setUploadedFile(new File([file], name));
        form.setValue("name", name);
        form.setValue("file", new File([file], name));
      }
    }
  }, [isOpen, form]);

  return (
    <Dialog open={isOpen && modalType === "upload"} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:p-8">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Drag and drop a file or click to select one. You can also modify the
            file name.
          </DialogDescription>
        </DialogHeader>

        <UploadForm onClose={onClose} initialValues={form.getValues()} />
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
