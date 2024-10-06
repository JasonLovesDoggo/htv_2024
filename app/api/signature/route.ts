import {NextResponse} from "next/server";


export async function PUT(request: Request) {
    return new NextResponse(JSON.stringify({
        verifier: "ArafOrzCatMan",
        VERSION: "1.0.0",
        COMPATIBLE_VERSIONS: ["1.0.0"],
    }), {
        status: 200,
        headers: {"Content-Type": "application/json"}
    });
}