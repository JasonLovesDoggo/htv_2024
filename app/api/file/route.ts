// app/api/file/rename/route.ts
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import xml2js from "xml2js";
import { z } from "zod";

import { serverUrl } from "@/lib/config/site";
import { uploadSchema } from "@/lib/validators/file";

export async function GET() {
  try {
    const response = await fetch("http://127.0.0.1:9000/first-bucket");

    let contents;

    xml2js.parseString(await response.text(), (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        return new Response(JSON.stringify({ error: "Failed to parse XML" }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      console.log("XML parsed:", result);
      // TODO: Parse XML and return files
      contents = result.ListBucketResult.Contents;

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

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

    if (!file) {
      return new Response(JSON.stringify({ error: "No file found" }), {
        status: 400,
      });
    }

    const uploadUrl = `http://127.0.0.1:9000/first-bucket/${encodeURIComponent(formData.get("name") as string)}`;

    const response = await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!response.ok) {
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
    const validatedFields = await z
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

    await fetch(
      `${serverUrl}/${encodeURIComponent(validatedFields.data.fileName)}`,
      {
        method: "DELETE",
      },
    );

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
    // Sanitize the names in case of any special characters
    const encodedOldName = encodeURIComponent(oldName);
    const encodedNewName = encodeURIComponent(newName);

    console.log("Encoded old name:", encodedOldName);
    console.log("Encoded new name:", encodedNewName);

    // 1. Copy the file to the new name
    const copyUrl = `http://127.0.0.1:9000/first-bucket/${encodedNewName}`;
    const copyResponse = await fetch(copyUrl, {
      method: "PUT",
      headers: {
        "x-amz-copy-source": `/first-bucket/${encodedOldName}`, // MinIO specific header
      },
    });

    const copyResponseText = await copyResponse.text(); // Get the text response for debugging

    if (!copyResponse.ok) {
      console.error("Error copying file:", copyResponseText);
      return NextResponse.json(
        { message: `Error copying file: ${copyResponseText}` },
        { status: 500 },
      );
    }

    // Log success message for the copy operation
    console.log("File copied successfully:", copyResponseText);

    // 2. Delete the original file after the copy is successful
    const deleteUrl = `http://127.0.0.1:9000/first-bucket/${encodedOldName}`;
    const deleteResponse = await fetch(deleteUrl, { method: "DELETE" });
    const deleteResponseText = await deleteResponse.text(); // Get the text response for debugging

    if (!deleteResponse.ok) {
      console.error("Error deleting original file:", deleteResponseText);
      return NextResponse.json(
        { message: `Error deleting original file: ${deleteResponseText}` },
        { status: 500 },
      );
    }

    // Log success message for the delete operation
    console.log("Original file deleted successfully:", deleteResponseText);

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
