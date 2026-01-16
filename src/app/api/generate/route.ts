import { NextRequest, NextResponse } from "next/server";
import { mockGenerateData } from "@/data/mockData";
import type { ApiResponse, GenerateRequest, GenerateResponse } from "@/lib/types";

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<GenerateResponse>>> {
  try {
    const body: GenerateRequest = await request.json();

    if (!body.domain) {
      return NextResponse.json(
        { success: false, error: "Domain is required" },
        { status: 400 }
      );
    }

    // Simulate API latency for demo
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // In production, this would call the Cline API
    // For demo, return mock data
    return NextResponse.json({
      success: true,
      data: mockGenerateData,
    });
  } catch (error) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate agent" },
      { status: 500 }
    );
  }
}
