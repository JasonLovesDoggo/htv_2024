"use server";

import { NextRequest, NextResponse } from "next/server";
import { blobToBase64 } from "@/utils/utils";
import blobUtil from "blob-util";
import xml2js from "xml2js";

import { filterByName } from "@/lib/validators/file";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const temp = await request.json();
    const input = await filterByName.parse(temp);
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
        console.log(results[i]);
        console.log(results[i]["Owner"]);
        const file_paths = results[i].Key[0].split("/")
        if (file_paths[file_paths.length - 1] === input.name) {
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
          k += 1;
        }
      }
      finalResult = tempResults;
    });
    return new Response(
      JSON.stringify({ success: true, images: finalResult }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
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
