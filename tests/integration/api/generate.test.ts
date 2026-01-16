import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "@/app/api/generate/route";
import { NextRequest } from "next/server";
import { mockResearchData, mockExtractData, mockSynthesizeData } from "@/data/mockData";

describe("POST /api/generate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns generated agent code and prompt", async () => {
    const request = new NextRequest("http://localhost:3000/api/generate", {
      method: "POST",
      body: JSON.stringify({
        domain: "steel metallurgy",
        research: mockResearchData,
        extract: mockExtractData,
        synthesize: mockSynthesizeData,
      }),
    });

    const responsePromise = POST(request);
    await vi.runAllTimersAsync();
    const response = await responsePromise;
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.agentCode).toBeDefined();
    expect(data.data.systemPrompt).toBeDefined();
    expect(data.data.systemPrompt).toContain("steel metallurgy");
  });

  it("returns error for missing domain", async () => {
    const request = new NextRequest("http://localhost:3000/api/generate", {
      method: "POST",
      body: JSON.stringify({
        research: mockResearchData,
        extract: mockExtractData,
        synthesize: mockSynthesizeData,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe("Domain is required");
  });
});
