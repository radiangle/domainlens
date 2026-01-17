import { create } from "zustand";

export type PipelineStage =
  | "idle"
  | "research"
  | "extract"
  | "visualize"
  | "synthesize"
  | "generate"
  | "complete";

export type StepStatus = "waiting" | "active" | "completed" | "error";

export interface PipelineStep {
  id: number;
  name: string;
  stage: PipelineStage;
  status: StepStatus;
  color: string;
}

export interface ResearchResult {
  title: string;
  summary: string;
  sources: string[];
  parameters: Record<string, string>;
}

export interface ExtractResult {
  entities: Array<{ name: string; type: string; description: string }>;
  relationships: Array<{ from: string; to: string; type: string }>;
}

export interface VisualResult {
  images: Array<{ url: string; prompt: string; caption: string }>;
}

export interface SynthesizeResult {
  records: Array<Record<string, string | number>>;
  schema: Record<string, string>;
}

export interface GenerateResult {
  agentCode: string;
  systemPrompt: string;
}

export interface PipelineState {
  domain: string;
  currentStage: PipelineStage;
  steps: PipelineStep[];
  research: ResearchResult | null;
  extract: ExtractResult | null;
  visuals: VisualResult | null;
  synthesize: SynthesizeResult | null;
  generate: GenerateResult | null;
  error: string | null;
  startTime: number | null;
  useRealAPIs: boolean;

  setDomain: (domain: string) => void;
  startPipeline: () => void;
  setStage: (stage: PipelineStage) => void;
  setStepStatus: (stepId: number, status: StepStatus) => void;
  setResearch: (result: ResearchResult) => void;
  setExtract: (result: ExtractResult) => void;
  setVisuals: (result: VisualResult) => void;
  setSynthesize: (result: SynthesizeResult) => void;
  setGenerate: (result: GenerateResult) => void;
  setError: (error: string) => void;
  setUseRealAPIs: (useReal: boolean) => void;
  reset: () => void;
}

const initialSteps: PipelineStep[] = [
  { id: 1, name: "Research", stage: "research", status: "waiting", color: "orange" },
  { id: 2, name: "Extract", stage: "extract", status: "waiting", color: "blue" },
  { id: 3, name: "Visualize", stage: "visualize", status: "waiting", color: "purple" },
  { id: 4, name: "Synthesize", stage: "synthesize", status: "waiting", color: "green" },
  { id: 5, name: "Generate", stage: "generate", status: "waiting", color: "cyan" },
];

export const usePipelineStore = create<PipelineState>((set) => ({
  domain: "",
  currentStage: "idle",
  steps: initialSteps,
  research: null,
  extract: null,
  visuals: null,
  synthesize: null,
  generate: null,
  error: null,
  startTime: null,
  useRealAPIs: false,

  setDomain: (domain) => set({ domain }),

  startPipeline: () =>
    set({
      currentStage: "research",
      startTime: Date.now(),
      error: null,
      steps: initialSteps.map((step, index) => ({
        ...step,
        status: index === 0 ? "active" : "waiting",
      })),
    }),

  setStage: (stage) =>
    set((state) => {
      const stageIndex = initialSteps.findIndex((s) => s.stage === stage);
      return {
        currentStage: stage,
        steps: state.steps.map((step, index) => ({
          ...step,
          status:
            index < stageIndex
              ? "completed"
              : index === stageIndex
                ? "active"
                : "waiting",
        })),
      };
    }),

  setStepStatus: (stepId, status) =>
    set((state) => ({
      steps: state.steps.map((step) =>
        step.id === stepId ? { ...step, status } : step
      ),
    })),

  setResearch: (result) => set({ research: result }),
  setExtract: (result) => set({ extract: result }),
  setVisuals: (result) => set({ visuals: result }),
  setSynthesize: (result) => set({ synthesize: result }),
  setGenerate: (result) => set({ generate: result }),

  setError: (error) =>
    set((state) => {
      const currentStepIndex = state.steps.findIndex(
        (s) => s.status === "active"
      );
      return {
        error,
        steps: state.steps.map((step, index) =>
          index === currentStepIndex ? { ...step, status: "error" } : step
        ),
      };
    }),

  setUseRealAPIs: (useReal) => set({ useRealAPIs: useReal }),

  reset: () =>
    set({
      domain: "",
      currentStage: "idle",
      steps: initialSteps,
      research: null,
      extract: null,
      visuals: null,
      synthesize: null,
      generate: null,
      error: null,
      startTime: null,
    }),
}));
