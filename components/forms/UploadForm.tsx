"use client";

import React, { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

import { UploadFormSchema, uploadSchema } from "@/lib/validators/file";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";

interface UploadFormProps {
  initialValues?: UploadFormSchema;
  onClose: () => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ initialValues, onClose }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const form = useForm<UploadFormSchema>({
    resolver: zodResolver(uploadSchema),
    defaultValues: initialValues || {
      name: "",
      file: undefined,
    },
  });

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

    localStorage.setItem("uploadedFile", JSON.stringify(values));

    form.reset();
    setUploadedFile(null);
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpload)} className="space-y-4">
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
  );
};

export default UploadForm;
