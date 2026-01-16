import { NextRequest, NextResponse } from "next/server";
import { mockSynthesizeData } from "@/data/mockData";
import type { ApiResponse, SynthesizeRequest, SynthesizeResponse } from "@/lib/types";

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<SynthesizeResponse>>> {
  try {
    const body: SynthesizeRequest = await request.json();

    if (!body.domain) {
      return NextResponse.json(
        { success: false, error: "Domain is required" },
        { status: 400 }
      );
    }

    // Simulate API latency for demo
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In production, this would call the Tonic Fabricate API
    // For demo, return mock data
    return NextResponse.json({
      success: true,
      data: mockSynthesizeData,
    });
  } catch (error) {
    console.error("Synthesize API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to synthesize data" },
      { status: 500 }
    );
  }
}
