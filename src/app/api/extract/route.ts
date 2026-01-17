import { NextRequest, NextResponse } from "next/server";
import { mockExtractData } from "@/data/mockData";
import type { ApiResponse, ExtractResponse } from "@/lib/types";

interface ExtractRequestBody {
  domain: string;
  researchData?: unknown;
  useRealAPIs?: boolean;
}

async function callTinyFishAPI(domain: string, summary: string): Promise<ExtractResponse> {
  const apiKey = process.env.TINYFISH_API_KEY;
  if (!apiKey) {
    throw new Error("TINYFISH_API_KEY not configured");
  }

  const response = await fetch("https://mino.ai/v1/automation/run", {
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: "about:blank",
      goal: `Extract entities and relationships from this domain knowledge about "${domain}":
${summary}

Return JSON with:
- entities: array of {name, type, description}
- relationships: array of {from, to, type}`,
    }),
  });

  if (!response.ok) {
    throw new Error(`TinyFish API error: ${response.status}`);
  }

  const result = await response.json();

  // Parse the result
  if (result.resultJson) {
    return {
      entities: result.resultJson.entities || [],
      relationships: result.resultJson.relationships || [],
    };
  }

  throw new Error("TinyFish returned no result");
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<ExtractResponse>>> {
  try {
    const body: ExtractRequestBody = await request.json();

    if (!body.domain) {
      return NextResponse.json(
        { success: false, error: "Domain is required" },
        { status: 400 }
      );
    }

    // Check if real APIs should be used
    if (body.useRealAPIs) {
      try {
        const summary = typeof body.researchData === "object" && body.researchData !== null
          ? (body.researchData as { summary?: string }).summary || body.domain
          : body.domain;
        const data = await callTinyFishAPI(body.domain, summary);
        return NextResponse.json({ success: true, data });
      } catch (error) {
        console.error("TinyFish API error:", error);
        return NextResponse.json(
          { success: false, error: error instanceof Error ? error.message : "TinyFish API failed" },
          { status: 500 }
        );
      }
    }

    // Demo mode: simulate API latency and return mock data
    await new Promise((resolve) => setTimeout(resolve, 6800));

    return NextResponse.json({
      success: true,
      data: mockExtractData,
    });
  } catch (error) {
    console.error("Extract API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to extract data" },
      { status: 500 }
    );
  }
}
