const AGENTQL_API_URL = "https://api.agentql.com/v1/query-data";

interface AgentQLResponse {
  data: Record<string, unknown>;
  metadata: { request_id: string };
}

export async function extractWithAgentQL(
  domain: string,
  researchSummary: string
): Promise<AgentQLResponse> {
  const apiKey = process.env.TINYFISH_API_KEY;

  if (!apiKey) {
    throw new Error("TINYFISH_API_KEY not configured");
  }

  // Use natural language prompt to extract entities and relationships
  const prompt = `Extract the following from this domain knowledge about "${domain}":
1. Key entities (concepts, processes, defects, methods) with their types and descriptions
2. Relationships between entities

Domain summary: ${researchSummary}

Return structured data with:
- entities: array of {name, type, description}
- relationships: array of {from, to, type}`;

  const response = await fetch(AGENTQL_API_URL, {
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      html: `<div>${researchSummary}</div>`,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`AgentQL API error: ${response.status} - ${error}`);
  }

  return response.json();
}
