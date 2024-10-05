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

export const serverUrlSchema = z.object({
  url: z
    .string()
    .trim()
    .min(10, "URL is too short, must be at least 10 characters")
    .max(2048, "URL is too long, must be less than 2048 characters")
    .regex(
      /^https:\/\/[a-zA-Z0-9-._~:\/?#[\]@!$&'()*+,;=%]+$/,
      "URL must start with 'https://' and be a valid URL format",
    )
    .url("Please enter a valid URL"),
});

export type ServerUrlFormValues = z.infer<typeof serverUrlSchema>;
