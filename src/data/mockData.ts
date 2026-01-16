import type {
  ResearchResponse,
  ExtractResponse,
  VisualizeResponse,
  SynthesizeResponse,
  GenerateResponse,
} from "@/lib/types";

export const mockResearchData: ResearchResponse = {
  title: "Steel Metallurgy Defect Analysis",
  summary:
    "Steel metallurgy defect analysis involves identifying and classifying various types of defects that occur during steel manufacturing processes. Common defects include PASCC (Post-Aging Sensitization and Corrosion Cracking), intergranular corrosion, stress corrosion cracking (SCC), and sensitization. These defects are typically analyzed using microscopy, spectroscopy, and electrochemical testing methods.",
  sources: [
    "ASM Handbook Volume 13A: Corrosion Fundamentals",
    "ASTM International Standards for Steel Testing",
    "Journal of Materials Science: Steel Defect Classification",
    "Metallurgical and Materials Transactions A",
    "Corrosion Science Journal - Recent Advances",
  ],
  parameters: {
    "Defect Types": "PASCC, SCC, Sensitization, Intergranular Corrosion",
    "Testing Methods": "Microscopy, XRD, EDS, Electrochemical",
    "Steel Grades": "304, 316, 321, 347 Stainless Steel",
    "Temperature Range": "-40°C to 800°C",
    "Critical Factors": "Chromium depletion, Carbon content, Heat treatment",
  },
};

export const mockExtractData: ExtractResponse = {
  entities: [
    {
      name: "PASCC",
      type: "Defect",
      description:
        "Post-Aging Sensitization and Corrosion Cracking - occurs after thermal aging",
    },
    {
      name: "Sensitization",
      type: "Process",
      description:
        "Chromium carbide precipitation at grain boundaries causing corrosion susceptibility",
    },
    {
      name: "SCC",
      type: "Defect",
      description:
        "Stress Corrosion Cracking - crack formation under tensile stress and corrosive environment",
    },
    {
      name: "Intergranular Corrosion",
      type: "Defect",
      description: "Corrosion occurring along grain boundaries in the metal",
    },
    {
      name: "Chromium Depletion",
      type: "Mechanism",
      description:
        "Reduction of chromium content below 12% at grain boundaries",
    },
    {
      name: "Optical Microscopy",
      type: "Method",
      description: "Visual examination of polished and etched steel samples",
    },
  ],
  relationships: [
    { from: "Sensitization", to: "PASCC", type: "causes" },
    { from: "Chromium Depletion", to: "Sensitization", type: "causes" },
    { from: "Sensitization", to: "Intergranular Corrosion", type: "leads_to" },
    { from: "SCC", to: "Intergranular Corrosion", type: "related_to" },
    { from: "Optical Microscopy", to: "PASCC", type: "detects" },
  ],
};

export const mockVisualData: VisualizeResponse = {
  images: [
    {
      url: "/images/microscopy-pascc.jpg",
      prompt:
        "Electron microscopy image of PASCC defect in stainless steel showing intergranular crack propagation, scientific visualization, high magnification 1000x",
      caption: "PASCC defect showing characteristic intergranular cracking pattern",
    },
    {
      url: "/images/sensitization-grain.jpg",
      prompt:
        "Metallographic image of sensitized stainless steel grain boundaries with chromium carbide precipitation, etched surface, scientific photography",
      caption: "Sensitized grain boundaries with chromium carbide precipitation",
    },
    {
      url: "/images/scc-fracture.jpg",
      prompt:
        "SEM image of stress corrosion cracking fracture surface in austenitic stainless steel, branching crack morphology, materials science",
      caption: "SCC fracture surface showing branching crack morphology",
    },
    {
      url: "/images/corrosion-map.jpg",
      prompt:
        "Heat map visualization of corrosion susceptibility zones in welded stainless steel joint, false color thermal imaging style",
      caption: "Corrosion susceptibility map of welded joint",
    },
    {
      url: "/images/microstructure-healthy.jpg",
      prompt:
        "Optical microscopy image of healthy austenitic stainless steel microstructure, equiaxed grains, reference sample",
      caption: "Healthy microstructure for comparison - equiaxed austenite grains",
    },
    {
      url: "/images/defect-classification.jpg",
      prompt:
        "Infographic showing classification tree of steel defects, technical diagram, material science visualization",
      caption: "Defect classification hierarchy",
    },
  ],
};

export const mockSynthesizeData: SynthesizeResponse = {
  schema: {
    sample_id: "string",
    steel_grade: "string",
    defect_type: "string",
    severity: "string",
    temperature_c: "number",
    exposure_hours: "number",
    chromium_content: "number",
    diagnosis: "string",
  },
  records: [
    {
      sample_id: "STL-001",
      steel_grade: "304",
      defect_type: "PASCC",
      severity: "High",
      temperature_c: 650,
      exposure_hours: 100,
      chromium_content: 10.2,
      diagnosis: "Severe sensitization with active PASCC",
    },
    {
      sample_id: "STL-002",
      steel_grade: "316",
      defect_type: "SCC",
      severity: "Medium",
      temperature_c: 80,
      exposure_hours: 500,
      chromium_content: 16.5,
      diagnosis: "Chloride-induced SCC in HAZ",
    },
    {
      sample_id: "STL-003",
      steel_grade: "304",
      defect_type: "Sensitization",
      severity: "Low",
      temperature_c: 550,
      exposure_hours: 24,
      chromium_content: 14.8,
      diagnosis: "Early stage sensitization",
    },
    {
      sample_id: "STL-004",
      steel_grade: "321",
      defect_type: "None",
      severity: "None",
      temperature_c: 700,
      exposure_hours: 200,
      chromium_content: 17.2,
      diagnosis: "Stabilized grade - no sensitization",
    },
    {
      sample_id: "STL-005",
      steel_grade: "304",
      defect_type: "Intergranular Corrosion",
      severity: "High",
      temperature_c: 600,
      exposure_hours: 150,
      chromium_content: 9.8,
      diagnosis: "Severe Cr depletion at grain boundaries",
    },
    {
      sample_id: "STL-006",
      steel_grade: "347",
      defect_type: "None",
      severity: "None",
      temperature_c: 650,
      exposure_hours: 100,
      chromium_content: 17.5,
      diagnosis: "Nb-stabilized - resistant to sensitization",
    },
    {
      sample_id: "STL-007",
      steel_grade: "304L",
      defect_type: "Sensitization",
      severity: "Low",
      temperature_c: 700,
      exposure_hours: 48,
      chromium_content: 15.2,
      diagnosis: "Low carbon grade with minor sensitization",
    },
    {
      sample_id: "STL-008",
      steel_grade: "316",
      defect_type: "PASCC",
      severity: "Medium",
      temperature_c: 600,
      exposure_hours: 80,
      chromium_content: 12.1,
      diagnosis: "Mo-bearing steel with moderate PASCC",
    },
  ],
};

export const mockGenerateData: GenerateResponse = {
  systemPrompt: `You are an expert AI agent specialized in steel metallurgy defect analysis. You have deep knowledge of:

1. **Defect Types**: PASCC, SCC, Sensitization, Intergranular Corrosion
2. **Analysis Methods**: Optical microscopy, SEM, XRD, EDS, electrochemical testing
3. **Steel Grades**: 304, 316, 321, 347, and their variants (L, H grades)
4. **Critical Parameters**: Temperature exposure, time, chromium content, carbon content

When analyzing samples:
- Ask for steel grade, exposure conditions, and any visual observations
- Consider temperature history and environment
- Evaluate chromium depletion risk based on thermal exposure
- Provide severity assessment and recommended actions

Always explain your reasoning based on metallurgical principles.`,
  agentCode: `// Generated Steel Metallurgy Defect Analysis Agent
import { createAgent } from '@domainlens/agent';

export const steelDefectAgent = createAgent({
  name: 'Steel Metallurgy Defect Analyzer',
  domain: 'steel-metallurgy',
  capabilities: [
    'defect-classification',
    'severity-assessment',
    'root-cause-analysis',
    'recommendation-generation'
  ],
  knowledge: {
    defectTypes: ['PASCC', 'SCC', 'Sensitization', 'Intergranular Corrosion'],
    steelGrades: ['304', '316', '321', '347', '304L', '316L'],
    criticalTemperature: { min: 450, max: 850, unit: 'C' },
    chromiumThreshold: 12.0
  }
});`,
};

export const mockChatMessages = [
  {
    role: "agent" as const,
    content:
      "Hello! I'm your Steel Metallurgy Defect Analysis Agent. I can help you identify and diagnose defects in stainless steel samples. What would you like to analyze today?",
  },
  {
    role: "user" as const,
    content:
      "I have a 304 stainless steel sample that was exposed to 650°C for 100 hours. What defects should I look for?",
  },
  {
    role: "agent" as const,
    content: `Based on the exposure conditions you described (304 SS at 650°C for 100 hours), this falls squarely in the **sensitization temperature range** (450-850°C). Here's my analysis:

**High Risk Defects to Check:**
1. **Sensitization** - Very likely. At 650°C for 100 hours, chromium carbides (Cr23C6) will precipitate at grain boundaries.
2. **PASCC** - If the sample experiences subsequent stress or corrosive environment, PASCC is a significant risk.

**Recommended Testing:**
- Oxalic acid etch test (ASTM A262 Practice A) for screening
- Strauss test for quantitative assessment
- Measure chromium content near grain boundaries via EDS

**Severity Prediction:** High - this exposure duration is sufficient for significant Cr depletion below the 12% threshold.

Would you like me to analyze specific microscopy images or test results?`,
  },
];
