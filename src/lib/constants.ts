export const PIPELINE_STAGES = [
  { id: 1, name: "Research", stage: "research", color: "orange", tool: "Yutori" },
  { id: 2, name: "Extract", stage: "extract", color: "blue", tool: "TinyFish" },
  { id: 3, name: "Visualize", stage: "visualize", color: "purple", tool: "Freepik" },
  { id: 4, name: "Synthesize", stage: "synthesize", color: "green", tool: "Tonic" },
  { id: 5, name: "Generate", stage: "generate", color: "cyan", tool: "Cline" },
] as const;

export const STAGE_COLORS = {
  research: "#f97316",
  extract: "#3b82f6",
  visualize: "#a855f7",
  synthesize: "#22c55e",
  generate: "#06b6d4",
} as const;

export const DEFAULT_DOMAIN = "Build an AI agent for steel metallurgy defect analysis";

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  stagger: 150,
} as const;
