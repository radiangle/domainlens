import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "@/app/api/synthesize/route";
import { NextRequest } from "next/server";
import { mockExtractData } from "@/data/mockData";

describe("POST /api/synthesize", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns synthetic data records", async () => {
    const request = new NextRequest("http://localhost:3000/api/synthesize", {
      method: "POST",
      body: JSON.stringify({
        domain: "steel metallurgy",
        entities: mockExtractData.entities,
        relationships: mockExtractData.relationships,
      }),
    });

    const responsePromise = POST(request);
    await vi.runAllTimersAsync();
    const response = await responsePromise;
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.records).toBeDefined();
    expect(data.data.records.length).toBeGreaterThan(0);
    expect(data.data.schema).toBeDefined();
  });

  it("returns error for missing domain", async () => {
    const request = new NextRequest("http://localhost:3000/api/synthesize", {
      method: "POST",
      body: JSON.stringify({
        entities: mockExtractData.entities,
        relationships: mockExtractData.relationships,
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe("Domain is required");
  });
});
