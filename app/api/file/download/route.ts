// app/api/file/download/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get("name"); // Get the file name from query string

  if (!fileName) {
    return NextResponse.json(
      { message: "File name is required" },
      { status: 400 },
    );
  }

  try {
    // Construct the file URL from MinIO
    const fileUrl = `http://127.0.0.1:9000/first-bucket/${encodeURIComponent(fileName)}`;

    // Fetch the file from MinIO using fetch
    const fileResponse = await fetch(fileUrl);

    if (!fileResponse.ok) {
      return NextResponse.json(
        { message: "Error fetching file from MinIO" },
        { status: 500 },
      );
    }

    // Get the content type from the file response
    const contentType =
      fileResponse.headers.get("content-type") || "application/octet-stream";

    // Set headers for download
    const headers = new Headers();
    headers.append("Content-Disposition", `attachment; filename="${fileName}"`);
    headers.append("Content-Type", contentType);

    // Return the file stream as the response
    return new NextResponse(fileResponse.body, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    return NextResponse.json(
      { message: "Error downloading file", error },
      { status: 500 },
    );
  }
}
