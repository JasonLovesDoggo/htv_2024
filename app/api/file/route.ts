import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import { deleteFile, listObjects, renameFile, uploadFile } from "@/lib/s3";

export async function GET() {
  try {
    const contents = await listObjects();

    return new Response(JSON.stringify({ contents }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error getting files:", error);
    return new Response(JSON.stringify({ error: "Failed to get files" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;
    const fileName = formData.get("name") as string;

    if (!file || !fileName) {
      return new Response(
        JSON.stringify({ error: "No file or file name found" }),
        {
          status: 400,
        },
      );
    }

    const buffer = await file.arrayBuffer();
    const success = await uploadFile(fileName, Buffer.from(buffer), file.type);

    if (!success) {
      throw new Error("Failed to upload file");
    }

    revalidatePath("/files");

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
    const validatedFields = z
      .object({ fileName: z.string().trim().min(1).max(100) })
      .safeParse(body);

    if (!validatedFields.success) {
      return new Response(JSON.stringify(validatedFields.error), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const success = await deleteFile(validatedFields.data.fileName);

    if (!success) {
      throw new Error("Failed to delete file");
    }

    revalidatePath("/files");

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

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const oldName = searchParams.get("oldName");
  const newName = searchParams.get("newName");

  if (!oldName || !newName) {
    return NextResponse.json(
      { message: "Both old name and new name are required" },
      { status: 400 },
    );
  }

  try {
    const success = await renameFile(oldName, newName);

    if (!success) {
      throw new Error("Failed to rename file");
    }

    revalidatePath("/files");

    return NextResponse.json(
      { message: "File renamed successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error during rename operation:", error);
    return NextResponse.json(
      { message: "Error renaming file", error },
      { status: 500 },
    );
  }
}
