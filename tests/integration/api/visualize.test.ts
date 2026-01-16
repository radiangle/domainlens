import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "@/app/api/visualize/route";
import { NextRequest } from "next/server";
import { mockExtractData } from "@/data/mockData";

describe("POST /api/visualize", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns generated images", async () => {
    const request = new NextRequest("http://localhost:3000/api/visualize", {
      method: "POST",
      body: JSON.stringify({
        domain: "steel metallurgy",
        entities: mockExtractData.entities,
      }),
    });

    const responsePromise = POST(request);
    await vi.runAllTimersAsync();
    const response = await responsePromise;
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.images).toBeDefined();
    expect(data.data.images.length).toBeGreaterThan(0);
    expect(data.data.images[0]).toHaveProperty("url");
    expect(data.data.images[0]).toHaveProperty("prompt");
    expect(data.data.images[0]).toHaveProperty("caption");
  });

  it("returns error for missing domain", async () => {
    const request = new NextRequest("http://localhost:3000/api/visualize", {
      method: "POST",
      body: JSON.stringify({ entities: mockExtractData.entities }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe("Domain is required");
  });
});
