/**
 * Test script for verifying API integrations
 * Run with: npx tsx scripts/test-apis.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });

const AGENTQL_API_URL = "https://api.agentql.com/v1/query-data";
const FREEPIK_API_URL = "https://api.freepik.com/v1/ai/mystic";

async function testAgentQL() {
  console.log("\n=== Testing TinyFish/AgentQL API ===");

  const apiKey = process.env.TINYFISH_API_KEY;
  if (!apiKey) {
    console.log("❌ TINYFISH_API_KEY not set");
    return false;
  }

  console.log(`✓ API Key found: ${apiKey.slice(0, 10)}...`);

  try {
    const response = await fetch(AGENTQL_API_URL, {
      method: "POST",
      headers: {
        "X-API-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "Extract the main heading and any links",
        url: "https://example.com",
      }),
    });

    console.log(`Response status: ${response.status}`);

    if (response.ok) {
      const data = await response.json();
      console.log("✓ AgentQL API working!");
      console.log("Response:", JSON.stringify(data, null, 2).slice(0, 500));
      return true;
    } else {
      const error = await response.text();
      console.log(`❌ AgentQL error: ${error}`);
      return false;
    }
  } catch (err) {
    console.log(`❌ AgentQL request failed: ${err}`);
    return false;
  }
}

async function testFreepik() {
  console.log("\n=== Testing Freepik API ===");

  const apiKey = process.env.FREEPIK_API_KEY;
  if (!apiKey) {
    console.log("❌ FREEPIK_API_KEY not set");
    return false;
  }

  console.log(`✓ API Key found: ${apiKey.slice(0, 10)}...`);

  try {
    const response = await fetch(FREEPIK_API_URL, {
      method: "POST",
      headers: {
        "x-freepik-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "A simple blue circle on white background, minimal",
        resolution: "1k",
        aspect_ratio: "square_1_1",
        model: "realism",
      }),
    });

    console.log(`Response status: ${response.status}`);

    if (response.ok) {
      const data = await response.json();
      console.log("✓ Freepik API working!");
      console.log("Task ID:", data.data?.task_id);
      console.log("Status:", data.data?.status);
      return true;
    } else {
      const error = await response.text();
      console.log(`❌ Freepik error: ${error}`);
      return false;
    }
  } catch (err) {
    console.log(`❌ Freepik request failed: ${err}`);
    return false;
  }
}

async function testYutori() {
  console.log("\n=== Testing Yutori API ===");

  const apiKey = process.env.YUTORI_API_KEY;
  if (!apiKey) {
    console.log("❌ YUTORI_API_KEY not set");
    return false;
  }

  console.log(`✓ API Key found: ${apiKey.slice(0, 10)}...`);

  // Try the browsing API
  try {
    const response = await fetch("https://api.yutori.com/v1/browsing/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: "Search for information about steel metallurgy defects",
      }),
    });

    console.log(`Response status: ${response.status}`);

    if (response.ok) {
      const data = await response.json();
      console.log("✓ Yutori API working!");
      console.log("Response:", JSON.stringify(data, null, 2).slice(0, 500));
      return true;
    } else {
      const error = await response.text();
      console.log(`Yutori response: ${error.slice(0, 500)}`);
      return false;
    }
  } catch (err) {
    console.log(`❌ Yutori request failed: ${err}`);
    return false;
  }
}

async function main() {
  console.log("🔍 Testing DomainLens API Integrations\n");

  const results = {
    agentql: await testAgentQL(),
    freepik: await testFreepik(),
    yutori: await testYutori(),
  };

  console.log("\n=== Summary ===");
  console.log(`TinyFish/AgentQL: ${results.agentql ? "✓" : "❌"}`);
  console.log(`Freepik: ${results.freepik ? "✓" : "❌"}`);
  console.log(`Yutori: ${results.yutori ? "✓" : "❌"}`);
}

main();
