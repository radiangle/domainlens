import type {
  ResearchResponse,
  ExtractResponse,
  VisualizeResponse,
  SynthesizeResponse,
  GenerateResponse,
} from "@/lib/types";

// Data sourced from Yutori research response
export const mockResearchData: ResearchResponse = {
  title: "Stainless Steel Defects: Causes, Ranges, Tests, Prevention",
  summary: `Steel metallurgy defect analysis involves identifying and classifying various types of defects that occur during steel manufacturing and service. Four primary defects analyzed:

**1) Sensitization** - Precipitation of chromium-rich carbides at grain boundaries depletes adjacent chromium below the critical level when exposed within the sensitization range (550°C–850°C) during welding or heat treatment.

**2) SCC (Stress Corrosion Cracking)** - Requires susceptible material, corrosive environment (often chlorides or caustics), and tensile stress; often initiates at pits then propagates brittlely. Typically occurs above 100°C.

**3) Pitting** - Passive film breakdown by chlorides at weak sites (e.g., MnS inclusions) creates active pits with acidic, concentrated chloride chemistry.

**4) PASCC (Polythionic Acid SCC)** - Affects sensitized austenitic stainless steels when polythionic acids form from sulfur compounds with moisture and oxygen, attacking chromium-depleted grain boundaries—often during shutdowns.`,
  sources: [
    "ASTM International Standards (astm.org)",
    "ASTM A262 - Sensitization Testing",
    "ASTM G36, G129 - SCC Testing",
    "ASTM G48 - Pitting Testing",
    "ASTM G35 - PASCC Testing",
    "NACE MR0175/ISO 15156",
  ],
  parameters: {
    "Sensitization Range": "550–850°C formation, prevent below 425°C",
    "SCC Temperature": ">100°C typical, can occur at 55°C in oxidizing conditions",
    "Pitting CPT": "Varies by alloy (10–85°C+), 316L ~20–25°C in seawater",
    "PASCC Cracking": "20–100°C during shutdowns with moisture/oxygen",
    "Prevention Grades": "Low-C grades (304L, 316L), Ti/Nb-stabilized (321, 347)",
  },
};

// Data sourced from TinyFish extraction responses
export const mockExtractData: ExtractResponse = {
  entities: [
    {
      name: "Sensitization",
      type: "Defect",
      description:
        "Loss of alloy integrity from chromium depletion in the vicinity of carbides precipitated at grain boundaries, causing susceptibility to intergranular corrosion or SCC. Temperature range: 425–815°C.",
    },
    {
      name: "Stress Corrosion Cracking (SCC)",
      type: "Defect",
      description:
        "Crack formation requiring susceptible material, corrosive environment (chlorides), and tensile stress. Cracks typically initiate at pits. Related to critical chloride concentration and threshold stress.",
    },
    {
      name: "Pitting Corrosion",
      type: "Defect",
      description:
        "Localized corrosion forming small holes in the metal. Passive film breakdown by chlorides at weak sites like MnS inclusions creates active pits.",
    },
    {
      name: "PASCC",
      type: "Defect",
      description:
        "Polythionic Acid Stress Corrosion Cracking - affects sensitized austenitic stainless steels when polythionic acids form from sulfur compounds with moisture and oxygen during shutdowns.",
    },
    {
      name: "Chromium Depletion",
      type: "Mechanism",
      description:
        "Reduction of chromium content below critical level (~12%) at grain boundaries due to carbide precipitation, creating corrosion-susceptible zones.",
    },
    {
      name: "ASTM A262",
      type: "Testing Standard",
      description:
        "Standard for detecting sensitization in austenitic stainless steels. Practice A: oxalic acid etch test.",
    },
    {
      name: "ASTM G36",
      type: "Testing Standard",
      description:
        "Standard test method for evaluating stress corrosion cracking of metals in specific environments.",
    },
    {
      name: "ASTM G48",
      type: "Testing Standard",
      description:
        "Standard test methods for pitting and crevice corrosion resistance. Methods E, F for CPT/CCT determination.",
    },
  ],
  relationships: [
    { from: "Chromium Depletion", to: "Sensitization", type: "causes" },
    { from: "Sensitization", to: "PASCC", type: "enables" },
    { from: "Sensitization", to: "Intergranular Corrosion", type: "leads_to" },
    { from: "Pitting Corrosion", to: "SCC", type: "initiates" },
    { from: "ASTM A262", to: "Sensitization", type: "detects" },
    { from: "ASTM G36", to: "SCC", type: "tests" },
    { from: "ASTM G48", to: "Pitting Corrosion", type: "tests" },
  ],
};

// Reference to actual Freepik-generated image
export const mockVisualData: VisualizeResponse = {
  images: [
    {
      url: "/images/sample_freepik.png",
      prompt:
        "Microscopy image of steel metallurgy defect showing grain boundary sensitization and chromium depletion zones",
      caption: "AI-generated visualization of steel microstructure defects",
    },
  ],
};

// Data sourced from Tonic Fabricate CSV - tonic_steel_defect_inspections.csv
export const mockSynthesizeData: SynthesizeResponse = {
  schema: {
    ncr_id: "string",
    date: "string",
    steel_grade: "string",
    defect_type: "string",
    temperature_celsius: "number",
    environment_conditions: "string",
    symptoms_observed: "string",
    root_cause: "string",
    test_standard_used: "string",
    severity: "string",
    recommended_fix: "string",
  },
  records: [
    {
      ncr_id: "QA-MET-001",
      date: "2024-10-14",
      steel_grade: "347",
      defect_type: "SCC",
      temperature_celsius: 80,
      environment_conditions: "Marine atmospheric exposure",
      symptoms_observed: "Multiple crack initiation sites at stress risers",
      root_cause: "Evaporative chloride concentration under thermal insulation",
      test_standard_used: "ASTM G36",
      severity: "Minor",
      recommended_fix: "Replace insulation with low-chloride specification material",
    },
    {
      ncr_id: "QA-MET-002",
      date: "2024-10-20",
      steel_grade: "2205",
      defect_type: "Pitting",
      temperature_celsius: 55,
      environment_conditions: "Stagnant chloride solution",
      symptoms_observed: "Localized hemispherical pits with undercut morphology",
      root_cause: "Breakdown of passive film at MnS inclusion sites",
      test_standard_used: "ASTM G48",
      severity: "Minor",
      recommended_fix: "Apply electropolishing to remove MnS inclusions",
    },
    {
      ncr_id: "QA-MET-003",
      date: "2024-10-22",
      steel_grade: "304",
      defect_type: "SCC",
      temperature_celsius: 98,
      environment_conditions: "Chloride-containing process stream",
      symptoms_observed: "Crack propagation perpendicular to tensile stress",
      root_cause: "Evaporative chloride concentration under thermal insulation",
      test_standard_used: "ASTM G36",
      severity: "Critical",
      recommended_fix: "Implement stress relief annealing post-fabrication",
    },
    {
      ncr_id: "QA-MET-007",
      date: "2024-10-29",
      steel_grade: "347",
      defect_type: "PASCC",
      temperature_celsius: 23,
      environment_conditions: "Refinery hydroprocessing unit shutdown",
      symptoms_observed: "Rapid crack propagation during shutdown cooling",
      root_cause: "Inadequate dry-out procedure before shutdown",
      test_standard_used: "ASTM G35",
      severity: "Moderate",
      recommended_fix: "Solution anneal to eliminate sensitization",
    },
    {
      ncr_id: "QA-MET-012",
      date: "2024-11-06",
      steel_grade: "316",
      defect_type: "Sensitization",
      temperature_celsius: 594,
      environment_conditions: "Prolonged service at elevated temperature",
      symptoms_observed: "Intergranular corrosion visible at grain boundaries",
      root_cause: "Carbon content exceeding 0.03% in non-L grade",
      test_standard_used: "ASTM A262",
      severity: "Moderate",
      recommended_fix: "Replace with L-grade (low carbon) variant",
    },
    {
      ncr_id: "QA-MET-030",
      date: "2024-12-07",
      steel_grade: "347",
      defect_type: "Pitting",
      temperature_celsius: 75,
      environment_conditions: "Acidic process fluid with halide contamination",
      symptoms_observed: "Multiple pit colonies in preferential pattern",
      root_cause: "PREN value below minimum for service conditions",
      test_standard_used: "ASTM G48",
      severity: "Critical",
      recommended_fix: "Upgrade to 316L or higher PREN alloy",
    },
    {
      ncr_id: "QA-MET-044",
      date: "2024-12-31",
      steel_grade: "347",
      defect_type: "SCC",
      temperature_celsius: 125,
      environment_conditions: "Chloride-containing process stream",
      symptoms_observed: "Crack propagation perpendicular to tensile stress",
      root_cause: "Stress concentration at geometric discontinuity",
      test_standard_used: "ASTM G36",
      severity: "Critical",
      recommended_fix: "Implement stress relief annealing post-fabrication",
    },
    {
      ncr_id: "QA-MET-047",
      date: "2025-01-09",
      steel_grade: "347",
      defect_type: "PASCC",
      temperature_celsius: 77,
      environment_conditions: "FCC regenerator flue gas exposure",
      symptoms_observed: "Rapid crack propagation during shutdown cooling",
      root_cause: "Sensitized microstructure exposed to polythionic acid",
      test_standard_used: "ASTM G35",
      severity: "Critical",
      recommended_fix: "Solution anneal to eliminate sensitization",
    },
  ],
};

export const mockGenerateData: GenerateResponse = {
  systemPrompt: `You are an expert AI agent specialized in steel metallurgy defect analysis. You have deep knowledge of:

1. **Defect Types**: Sensitization, SCC (Stress Corrosion Cracking), Pitting, PASCC (Polythionic Acid SCC)
2. **Analysis Methods**: ASTM A262 (sensitization), ASTM G36/G129 (SCC), ASTM G48 (pitting), ASTM G35 (PASCC)
3. **Steel Grades**: 304, 304L, 316, 316L, 321, 347, 2205 Duplex
4. **Critical Parameters**:
   - Sensitization: 550-850°C range, chromium depletion below 12%
   - SCC: >100°C typical, chloride concentration, tensile stress
   - Pitting: CPT varies by alloy, MnS inclusions, PREN values
   - PASCC: 20-100°C during shutdowns, sulfur compounds

When analyzing samples:
- Ask for steel grade, exposure conditions, and observed symptoms
- Consider temperature history and environmental factors
- Evaluate chromium depletion risk based on thermal exposure
- Reference appropriate ASTM test standards
- Provide severity assessment (Minor/Moderate/Critical)
- Recommend specific corrective actions

Always explain your reasoning based on metallurgical principles and industry standards.`,
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
    defectTypes: ['Sensitization', 'SCC', 'Pitting', 'PASCC'],
    steelGrades: ['304', '304L', '316', '316L', '321', '347', '2205'],
    testStandards: ['ASTM A262', 'ASTM G36', 'ASTM G48', 'ASTM G35'],
    criticalTemperatures: {
      sensitization: { min: 550, max: 850, unit: 'C' },
      scc: { min: 100, typical: 155, unit: 'C' },
      pascc: { min: 20, max: 100, unit: 'C' }
    },
    chromiumThreshold: 12.0
  }
});`,
};

export const mockChatMessages = [
  {
    role: "agent" as const,
    content:
      "Hello! I'm your Steel Metallurgy Defect Analysis Agent. I can help you identify and diagnose defects in stainless steel samples including Sensitization, SCC, Pitting, and PASCC. What would you like to analyze today?",
  },
  {
    role: "user" as const,
    content:
      "I have a 304 stainless steel sample that was exposed to 650°C for 100 hours in a chloride environment. What defects should I look for?",
  },
  {
    role: "agent" as const,
    content: `Based on the exposure conditions you described (304 SS at 650°C for 100 hours in chloride environment), this is a high-risk scenario. Here's my analysis:

**Primary Concern: Sensitization**
- 650°C is squarely in the sensitization range (550-850°C)
- 100 hours is more than sufficient for significant Cr-carbide precipitation
- Recommended test: ASTM A262 Practice A (oxalic acid etch)

**Secondary Concern: SCC Risk**
- If the sample experiences tensile stress in the chloride environment
- Temperature >100°C with chlorides is a classic SCC scenario
- Recommended test: ASTM G36

**Severity Assessment: Critical**
- Extended exposure in sensitization range
- Chloride environment compounds the risk
- Non-L grade (304 vs 304L) has higher carbon content

**Recommended Actions:**
1. Perform ASTM A262 to confirm sensitization degree
2. Check for intergranular corrosion at grain boundaries
3. If cracks found, test per ASTM G36 for SCC
4. Consider replacement with 304L or stabilized grade (321/347)

Would you like me to analyze specific test results or microscopy images?`,
  },
];
