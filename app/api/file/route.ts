import { z } from "zod";

import { uploadSchema } from "@/lib/validators/file";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedFields = await uploadSchema.safeParse(body);

    if (!validatedFields.success) {
      return new Response(JSON.stringify(validatedFields.error), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    console.log("File uploaded:", body);
    // TODO: Add to the database/storage

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return new Response(JSON.stringify({ error: "Failed to upload file" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const validatedFields = await z
      .object({ id: z.string().trim().min(1).max(100) })
      .safeParse(body);

    if (!validatedFields.success) {
      return new Response(JSON.stringify(validatedFields.error), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    console.log("Deleting file:", validatedFields.data.id);
    // TODO: Delete file from the database/file system

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    return new Response(JSON.stringify({ error: "Failed to delete file" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
