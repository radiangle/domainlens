import { NextRequest, NextResponse } from "next/server";
import { mockVisualData } from "@/data/mockData";
import { generateAndWaitForImage } from "@/lib/api/freepik";
import type { ApiResponse, VisualizeResponse, Entity } from "@/lib/types";

interface VisualizeRequestBody {
  domain: string;
  entities?: Entity[];
  useRealAPIs?: boolean;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<VisualizeResponse>>> {
  try {
    const body: VisualizeRequestBody = await request.json();

    if (!body.domain) {
      return NextResponse.json(
        { success: false, error: "Domain is required" },
        { status: 400 }
      );
    }

    // Check if real APIs should be used
    if (body.useRealAPIs) {
      try {
        const prompt = `Scientific visualization of ${body.domain}, showing detailed technical diagram, professional quality, educational illustration`;
        const imageUrl = await generateAndWaitForImage(prompt);

        if (imageUrl) {
          return NextResponse.json({
            success: true,
            data: {
              images: [
                {
                  url: imageUrl,
                  prompt,
                  caption: `AI-generated visualization of ${body.domain}`,
                },
              ],
            },
          });
        }

        throw new Error("Image generation failed");
      } catch (error) {
        console.error("Freepik API error:", error);
        return NextResponse.json(
          { success: false, error: error instanceof Error ? error.message : "Freepik API failed" },
          { status: 500 }
        );
      }
    }

    // Demo mode: simulate API latency and return mock data
    await new Promise((resolve) => setTimeout(resolve, 6000));

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
