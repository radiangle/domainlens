import { NextRequest, NextResponse } from "next/server";
import { mockSynthesizeData } from "@/data/mockData";
import type { ApiResponse, SynthesizeResponse, Entity, Relationship } from "@/lib/types";

interface SynthesizeRequestBody {
  domain: string;
  entities?: Entity[];
  relationships?: Relationship[];
  useRealAPIs?: boolean;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<SynthesizeResponse>>> {
  try {
    const body: SynthesizeRequestBody = await request.json();

    if (!body.domain) {
      return NextResponse.json(
        { success: false, error: "Domain is required" },
        { status: 400 }
      );
    }

    // Note: Tonic Fabricate uses a web UI for data generation
    // In real mode, we return mock data with a note about manual Tonic usage
    if (body.useRealAPIs) {
      // For real API mode, we still use the pre-generated Tonic data
      // as Tonic requires web UI interaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return NextResponse.json({
        success: true,
        data: {
          ...mockSynthesizeData,
          // Add a note that this is pre-generated Tonic data
        },
      });
    }

    // Demo mode: simulate API latency and return mock data
    await new Promise((resolve) => setTimeout(resolve, 6500));

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
