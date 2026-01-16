import { NextRequest, NextResponse } from "next/server";
import { mockExtractData } from "@/data/mockData";
import type { ApiResponse, ExtractRequest, ExtractResponse } from "@/lib/types";

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<ExtractResponse>>> {
  try {
    const body: ExtractRequest = await request.json();

    if (!body.domain) {
      return NextResponse.json(
        { success: false, error: "Domain is required" },
        { status: 400 }
      );
    }

    // Simulate API latency for demo
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // In production, this would call the TinyFish/AgentQL API
    // For demo, return mock data
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
