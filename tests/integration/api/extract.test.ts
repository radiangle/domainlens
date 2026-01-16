import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "@/app/api/extract/route";
import { NextRequest } from "next/server";
import { mockResearchData } from "@/data/mockData";

describe("POST /api/extract", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns extracted entities and relationships", async () => {
    const request = new NextRequest("http://localhost:3000/api/extract", {
      method: "POST",
      body: JSON.stringify({
        domain: "steel metallurgy",
        researchData: mockResearchData,
      }),
    });

    const responsePromise = POST(request);
    await vi.runAllTimersAsync();
    const response = await responsePromise;
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.entities).toBeDefined();
    expect(data.data.entities.length).toBeGreaterThan(0);
    expect(data.data.relationships).toBeDefined();
    expect(data.data.relationships.length).toBeGreaterThan(0);
  });

  it("returns error for missing domain", async () => {
    const request = new NextRequest("http://localhost:3000/api/extract", {
      method: "POST",
      body: JSON.stringify({ researchData: mockResearchData }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe("Domain is required");
  });
});
