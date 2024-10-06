import { NextResponse } from "next/server";

import { getFileUrl } from "@/lib/s3";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get("name");

  if (!fileName) {
    return NextResponse.json(
      { message: "File name is required" },
      { status: 400 },
    );
  }

  try {
    const fileUrl = getFileUrl(fileName);
    const fileResponse = await fetch(fileUrl);

    if (!fileResponse.ok) {
      return NextResponse.json(
        { message: "Error fetching file from Storage" },
        { status: 500 },
      );
    }

    const contentType =
      fileResponse.headers.get("content-type") || "application/octet-stream";

    const headers = new Headers();
    headers.append("Content-Disposition", `attachment; filename="${fileName}"`);
    headers.append("Content-Type", contentType);

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
