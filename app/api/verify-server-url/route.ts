import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url, clientVersion } = await request.json();

    if (!url || !clientVersion) {
      return new NextResponse("Invalid input", { status: 400 });
    }

    const nextResponseNextResponse = await fetch(`${url}/signature`, {
      method: "PUT",
    });

    if (!nextResponseNextResponse.ok) {
      return new NextResponse("Failed to reach the server or server error", {
        status: 500,
      });
    }

    const result = await nextResponseNextResponse.json();

    const { version, verifier, compatible_versions } = result;

    if (verifier !== "ArafOrzCatMan") {
      return new NextResponse("Invalid server verifier", { status: 400 });
    }

    if (!compatible_versions.includes(clientVersion)) {
      return new NextResponse(
        `Client version ${clientVersion} is not compatible with server version`,
        { status: 400 },
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "Server URL verified successfully",
        serverVersion: version,
        compatibleVersions: compatible_versions,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error verifying server URL:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
