import { NextRequest, NextResponse } from "next/server";
import { mockResearchData } from "@/data/mockData";
import type { ApiResponse, ResearchResponse } from "@/lib/types";

interface ResearchRequestBody {
  domain: string;
  useRealAPIs?: boolean;
}

async function callYutoriAPI(query: string): Promise<ResearchResponse> {
  const apiKey = process.env.YUTORI_API_KEY;
  if (!apiKey) {
    throw new Error("YUTORI_API_KEY not configured");
  }

  // Create research task
  const createRes = await fetch("https://api.yutori.com/v1/research/tasks", {
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!createRes.ok) {
    throw new Error(`Yutori API error: ${createRes.status}`);
  }

  const { task_id } = await createRes.json();

  // Poll for completion (max 5 minutes - research can take a while)
  const maxWait = 300000;
  const startTime = Date.now();

  while (Date.now() - startTime < maxWait) {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const statusRes = await fetch(
      `https://api.yutori.com/v1/research/tasks/${task_id}`,
      {
        headers: { "X-API-Key": apiKey },
      }
    );

    if (!statusRes.ok) continue;

    const status = await statusRes.json();

    if (status.status === "succeeded" && status.result) {
      // Parse the HTML result into our format
      return {
        title: "Research Results",
        summary: status.result.replace(/<[^>]*>/g, "").slice(0, 2000),
        sources: (status.updates?.[0]?.citations || []).map(
          (c: { url: string }) => c.url
        ),
        parameters: {},
      };
    }

    if (status.status === "failed") {
      throw new Error("Yutori research task failed");
    }
  }

  throw new Error("Yutori research timed out");
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<ResearchResponse>>> {
  try {
    const body: ResearchRequestBody = await request.json();

    if (typeof body.domain !== "string" || body.domain.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Domain description is required (min 10 characters)" },
        { status: 400 }
      );
    }

    // Check if real APIs should be used
    if (body.useRealAPIs) {
      try {
        const data = await callYutoriAPI(body.domain);
        return NextResponse.json({ success: true, data });
      } catch (error) {
        console.error("Yutori API error:", error);
        return NextResponse.json(
          { success: false, error: error instanceof Error ? error.message : "Yutori API failed" },
          { status: 500 }
        );
      }
    }

    // Demo mode: simulate API latency and return mock data
    await new Promise((resolve) => setTimeout(resolve, 7500));

    return NextResponse.json({
      success: true,
      data: mockResearchData,
    });
  } catch (error) {
    console.error("Research API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to perform research" },
      { status: 500 }
    );
  }
}
