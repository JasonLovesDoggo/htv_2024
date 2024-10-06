"use server";
export async function blobToBase64(blob: Blob): Promise<string> {
  const arrayBuffer = await blob.arrayBuffer(); // Convert Blob to ArrayBuffer
  const buffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer
  return buffer.toString("base64"); // Convert Buffer to Base64
}
