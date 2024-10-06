"use server";

import { NextRequest, NextResponse } from "next/server";
import xml2js from "xml2js";

import { filterByCategory } from "@/lib/validators/file";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const temp = await request.json();
    const input = await filterByCategory.parse(temp);
    const response = await fetch(`${process.env.SERVER_URL}`);
    const xml = await response.text();
    let finalResult;
    xml2js.parseString(xml, (err, result) => {
      if (err) throw Error(err);
      const results: Array<any> = result["ListBucketResult"].Contents;
      let limit = input.limit ?? 5;
      let k = 0;
      const tempResults = [];
      for (let i = 0; i < limit; i++) {
        if (k >= limit) break;
        const file_paths = results[i].Key[0].split("/")
        if (file_paths.slice(0, file_paths.length - 1).includes(input.category)) {
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
          // @ts-ignore
          tempResults.push(formattedResult);
          k += 1
        }
      }
      finalResult = tempResults;
    });
    return new Response(
      JSON.stringify({ success: true, categories: finalResult }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (e) {
    console.error("Error filtering by category:", e);
    return new Response(
      JSON.stringify({ error: "Failed to filter by category" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
