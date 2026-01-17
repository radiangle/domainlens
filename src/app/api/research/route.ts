import { NextRequest, NextResponse } from "next/server";
import { mockResearchData } from "@/data/mockData";
import type { ApiResponse, ResearchRequest, ResearchResponse } from "@/lib/types";

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<ResearchResponse>>> {
  try {
    const body: ResearchRequest = await request.json();

    if (typeof body.domain !== "string" || body.domain.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Domain description is required (min 10 characters)" },
        { status: 400 }
      );
    }

    // Simulate API latency for demo (matches terminal animation ~7s)
    await new Promise((resolve) => setTimeout(resolve, 7500));

    // In production, this would call the Yutori API
    // For demo, return mock data
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
