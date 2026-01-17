import { NextRequest, NextResponse } from "next/server";
import type {
  ApiResponse,
  GenerateRequest,
  GenerateResponse,
  Entity,
  Relationship,
} from "@/lib/types";

function buildSystemPrompt(request: GenerateRequest): string {
  const { domain, research, extract, synthesize } = request;

  const entityList = extract?.entities
    ?.map((e: Entity) => `- **${e.name}** (${e.type}): ${e.description}`)
    .join("\n") || "No entities extracted";

  const relationshipList = extract?.relationships
    ?.map((r: Relationship) => `- ${r.from} → ${r.type} → ${r.to}`)
    .join("\n") || "No relationships identified";

  const schemaInfo = synthesize?.schema
    ? Object.entries(synthesize.schema)
        .map(([key, type]) => `- ${key}: ${type}`)
        .join("\n")
    : "No schema available";

  const recordCount = synthesize?.records?.length || 0;

  return `You are an expert AI agent specialized in ${domain}.

## Domain Knowledge
${research?.summary || "Domain knowledge is being gathered."}

## Key Sources
${research?.sources?.map((s) => `- ${s}`).join("\n") || "No sources available"}

## Domain Parameters
${research?.parameters ? Object.entries(research.parameters).map(([k, v]) => `- **${k}**: ${v}`).join("\n") : "No parameters defined"}

## Key Entities
${entityList}

## Entity Relationships
${relationshipList}

## Training Data
You have been trained on ${recordCount} sample records with the following schema:
${schemaInfo}

## Behavior Guidelines
- Ask clarifying questions when the user's query is ambiguous
- Provide severity assessments based on the training data patterns when applicable
- Always explain your reasoning using domain knowledge and established relationships
- Suggest next steps, testing procedures, or recommendations when appropriate
- Be precise with technical terminology specific to this domain
- Reference specific entities and their relationships when explaining concepts`;
}

function buildAgentCode(request: GenerateRequest): string {
  const { domain, extract, synthesize } = request;

  const capabilities = [
    "domain-analysis",
    "entity-classification",
    "relationship-mapping",
    "recommendation-generation",
  ];

  const entityNames = extract?.entities?.map((e: Entity) => e.name) || [];
  const entityTypes = Array.from(new Set(extract?.entities?.map((e: Entity) => e.type) || []));

  return `// Generated ${domain} Agent
import { createAgent } from '@domainlens/agent';

export const domainAgent = createAgent({
  name: '${domain} Expert Agent',
  domain: '${domain.toLowerCase().replace(/\s+/g, "-")}',
  capabilities: ${JSON.stringify(capabilities, null, 4)},
  knowledge: {
    entities: ${JSON.stringify(entityNames, null, 4)},
    entityTypes: ${JSON.stringify(entityTypes, null, 4)},
    recordCount: ${synthesize?.records?.length || 0},
    schema: ${JSON.stringify(synthesize?.schema || {}, null, 4)}
  }
});`;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<GenerateResponse>>> {
  try {
    const body: GenerateRequest = await request.json();

    if (!body.domain) {
      return NextResponse.json(
        { success: false, error: "Domain is required" },
        { status: 400 }
      );
    }

    // Simulate API latency for demo (matches terminal animation ~5s)
    await new Promise((resolve) => setTimeout(resolve, 5500));

    // Dynamically generate system prompt and agent code from pipeline data
    const systemPrompt = buildSystemPrompt(body);
    const agentCode = buildAgentCode(body);

    return NextResponse.json({
      success: true,
      data: {
        systemPrompt,
        agentCode,
      },
    });
  } catch (error) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate agent" },
      { status: 500 }
    );
  }
}
