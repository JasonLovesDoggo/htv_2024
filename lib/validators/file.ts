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

// POST
// /api/filter/name
export const filterByName = z.object({
  limit: z.number().optional(), // 0 for unlimited. It's also int.
});

// POST
// /api/filter/category
export const filterByCategory = z.object({
  limit: z.number().optional(), // 0 for unlimited. It's also int.
});

// POST
// /api/order/file-size
export const orderByFileSize = z.object({
  limit: z.number().optional(), // 0 for unlimited. It's also int.
  largestFirst: z.boolean().optional(), // Can't have both at the same time.
  leastFirst: z.boolean().optional(), // Can't have both at the same time.
});

// POST
// /api/order/uploaded-date
export const orderByUploadedDate = z.object({
  limit: z.number().optional(), // 0 for unlimited
  latestFirst: z.boolean().optional(), // Can't have both at the same time.
  earlielargestFirststFirst: z.boolean().optional(), // Can't have both at the same time.
});

// POST
// /api/create/file
export const createFile = z
  .object({
    name: z.string(),
  })
  .strict();

// POST
// /api/create/folder
// Not sure if we need it but just in case.
export const createFolder = z
  .object({
    name: z.string(),
  })
  .strict();

// POST
// /api/share/file
// this is temporary so this might be be changed.
export const shareFile = z.object({
  password: z.string().min(8).optional(),
  nuses: z.number().optional(), // 0 menas unlimited and it's also int
});

// POST
// /api/share/folder
// this is temporary so this might be be changed.
export const shareFolder = z.object({
  password: z.string().min(8).optional(),
  nuses: z.number().optional(), // 0 menas unlimited and it's also int
});
