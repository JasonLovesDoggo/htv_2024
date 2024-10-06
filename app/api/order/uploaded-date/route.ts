"use server";

import { NextRequest, NextResponse } from "next/server";
import xml2js from "xml2js";
import { z } from "zod";

import { orderByUploadedDate } from "@/lib/validators/file";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const temp = await request.json();
    const input = await orderByUploadedDate.parse(temp);
    if (
      (input.ascending && input.descending) ||
      (!input.ascending && !input.descending)
    )
      throw Error(
        "Request must either have ascending be true or descending be true",
      );
    const response = await fetch(`${process.env.SERVER_URL}`);
    const xml = await response.text();
    let finalResult;
    let limit = input.limit ?? 5;
    xml2js.parseString(xml, (err, result) => {
      if (err) throw Error(err);
      const results: Array<any> = result["ListBucketResult"].Contents;
      const tempResults = [];
      for (let i = 0; i < results.length; i++) {
        const currentResult = results[i];
        const formattedResult = {
          Key: currentResult.Key[0],
          LastModified: currentResult.LastModified[0],
          ETag: currentResult.ETag[0].slice(
            1,
            currentResult.ETag[0].length - 1,
          ),
          Size: Number(currentResult.Size[0]),
        };
        tempResults.push(formattedResult);
      }
      finalResult = tempResults;
    });
    if (input.ascending)
      finalResult.sort(
        (a, b) => new Date(a.Size).getTime() - new Date(b.Size).getTime(),
      );
    if (input.descending)
      finalResult.sort(
        (a, b) => new Date(b.Size).getTime() - new Date(a.Size).getTime(),
      );

    return new Response(
      JSON.stringify({
        success: true,
        data: finalResult.slice(0, limit),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (e) {
    console.error("Error filtering by category:", e);
    if (e instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return new Response(JSON.stringify({ error: e.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
