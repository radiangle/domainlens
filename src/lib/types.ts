// API Response Types

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Research Types (Yutori)
export interface ResearchRequest {
  domain: string;
}

export interface ResearchResponse {
  title: string;
  summary: string;
  sources: string[];
  parameters: Record<string, string>;
}

// Extract Types (TinyFish/AgentQL)
export interface ExtractRequest {
  domain: string;
  researchData: ResearchResponse;
}

export interface Entity {
  name: string;
  type: string;
  description: string;
}

export interface Relationship {
  from: string;
  to: string;
  type: string;
}

export interface ExtractResponse {
  entities: Entity[];
  relationships: Relationship[];
}

// Visualize Types (Freepik)
export interface VisualizeRequest {
  domain: string;
  entities: Entity[];
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  caption: string;
}

export interface VisualizeResponse {
  images: GeneratedImage[];
}

// Synthesize Types (Tonic Fabricate)
export interface SynthesizeRequest {
  domain: string;
  entities: Entity[];
  relationships: Relationship[];
}

export interface SynthesizeResponse {
  records: Array<Record<string, string | number>>;
  schema: Record<string, string>;
}

// Generate Types (Cline)
export interface GenerateRequest {
  domain: string;
  research: ResearchResponse;
  extract: ExtractResponse;
  synthesize: SynthesizeResponse;
}

export interface GenerateResponse {
  agentCode: string;
  systemPrompt: string;
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: number;
}
