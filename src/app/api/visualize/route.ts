import { NextRequest, NextResponse } from "next/server";
import { mockVisualData } from "@/data/mockData";
import type { ApiResponse, VisualizeRequest, VisualizeResponse } from "@/lib/types";

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<VisualizeResponse>>> {
  try {
    const body: VisualizeRequest = await request.json();

    if (!body.domain) {
      return NextResponse.json(
        { success: false, error: "Domain is required" },
        { status: 400 }
      );
    }

    // Simulate API latency for demo (matches terminal animation ~5.5s)
    await new Promise((resolve) => setTimeout(resolve, 6000));

    // In production, this would call the Freepik API
    // For demo, return mock data
    return NextResponse.json({
      success: true,
      data: mockVisualData,
    });
  } catch (error) {
    console.error("Visualize API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate visuals" },
      { status: 500 }
    );
  }
}
