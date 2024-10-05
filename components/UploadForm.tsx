"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define the validation schema with Zod
const uploadSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name can't exceed 50 characters" }),
  file: z.instanceof(File, { message: "File is required" }),
});

type UploadFormSchema = z.infer<typeof uploadSchema>;

interface UploadFormProps {
  onSubmit: (values: UploadFormSchema) => void;
  initialValues?: UploadFormSchema;
}

const UploadForm: React.FC<UploadFormProps> = ({ onSubmit, initialValues }) => {
  const form = useForm<UploadFormSchema>({
    resolver: zodResolver(uploadSchema),
    defaultValues: initialValues || {
      name: "",
      file: undefined,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
      </form>
    </Form>
  );
};

export default UploadForm;
