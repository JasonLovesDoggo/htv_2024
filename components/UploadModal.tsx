"use client";

import React, { useState, useCallback, useEffect } from "react";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadCloud } from "lucide-react";

// Define the validation schema with Zod
const uploadSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name can't exceed 50 characters" }),
  file: z.instanceof(File, { message: "File is required" }),
});

type UploadFormSchema = z.infer<typeof uploadSchema>;

const UploadModal: React.FC = () => {
  const { isOpen, onClose } = useUploadModal();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const form = useForm<UploadFormSchema>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      name: "",
      file: undefined,
    },
  });

  // Handle the file drop
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setUploadedFile(file);
        form.setValue("name", file.name);
        form.setValue("file", file);
      }
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleUpload = (values: UploadFormSchema) => {
    console.log("Uploading file:", values.file.name);
    console.log("File name:", values.name);

    // Store the uploaded file data in local storage for now
    // TODO: Implement a proper file upload API
    localStorage.setItem("uploadedFile", JSON.stringify(values));

    form.reset();
    setUploadedFile(null);
    onClose();
  };

  // Retrieve the uploaded file data from local storage when the modal is opened
  useEffect(() => {
    if (isOpen) {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:p-8">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Drag and drop a file or click to select one. You can also modify the
            file name.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpload)}
            className="space-y-4"
          >
            {/* File Dropzone */}
            <div
              {...getRootProps()}
              className={`rounded-lg border-2 border-dashed p-6 ${
                isDragActive ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-center text-sm text-gray-600">
                  Drag &apos;n&apos; drop
                </p>
                <span className="text-xs font-bold">or</span>
                <p className="cursor-pointer rounded-md border bg-gray-100 px-2 py-1 text-sm">
                  Choose a file
                </p>
              </div>
            </div>

            {/* Show selected file */}
            {uploadedFile && (
              <p className="mt-2 text-center text-sm text-gray-500">
                Selected file: {uploadedFile.name}
              </p>
            )}

            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter file name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <DialogFooter>
              <Button type="submit" disabled={!uploadedFile} className="w-full">
                <UploadCloud className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
