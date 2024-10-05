import { z } from "zod";

export const uploadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name can't exceed 50 characters" }),
  file: z.instanceof(File, { message: "File is required" }),
});

export type UploadFormSchema = z.infer<typeof uploadSchema>;

export const editFileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "File name is required")
    .max(100, "File name is too long"),
});

export type EditFileFormSchema = z.infer<typeof editFileSchema>;
