import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "@/app/api/research/route";
import { NextRequest } from "next/server";

describe("POST /api/research", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns research data for valid domain", async () => {
    const request = new NextRequest("http://localhost:3000/api/research", {
      method: "POST",
      body: JSON.stringify({ domain: "steel metallurgy defect analysis" }),
    });

    const responsePromise = POST(request);
    await vi.runAllTimersAsync();
    const response = await responsePromise;
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toBeDefined();
    expect(data.data.title).toBe("Steel Metallurgy Defect Analysis");
    expect(data.data.sources).toHaveLength(5);
    expect(data.data.parameters).toBeDefined();
  });

  it("returns error for missing domain", async () => {
    const request = new NextRequest("http://localhost:3000/api/research", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toContain("Domain description is required");
  });

  it("returns error for short domain", async () => {
    const request = new NextRequest("http://localhost:3000/api/research", {
      method: "POST",
      body: JSON.stringify({ domain: "short" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });
});
