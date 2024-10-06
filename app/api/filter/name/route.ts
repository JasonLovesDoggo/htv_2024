"use server";

import { NextRequest, NextResponse } from "next/server";

import { filterByName } from "@/lib/validators/file";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    console.log(request.body);
    const input = filterByName.parse(request.body);
    let limit = 5;
    if (input.limit !== undefined) {
      limit = input.limit;
    }
    const response = await fetch("http://localhost:9000/first-bucket");
    console.log(await response.text());
    return new Response(JSON.stringify({ success: true, names: [] }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("Error filtering by name:", e);
    return new Response(JSON.stringify({ error: "Failed to filter by name" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
