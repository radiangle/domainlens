"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface StepProgressProps {
  stage: string;
  tool: string;
  color: "orange" | "blue" | "purple" | "green" | "cyan";
}

interface TerminalLine {
  type: "command" | "data" | "complete" | "info";
  content: string;
  delay: number;
}

const stageTerminalLines: Record<string, TerminalLine[]> = {
  research: [
    { type: "command", content: 'curl --request POST \\', delay: 0 },
    { type: "command", content: '  --url https://api.yutori.com/v1/research/tasks \\', delay: 100 },
    { type: "command", content: '  --header \'X-API-Key: yt_***\' \\', delay: 200 },
    { type: "command", content: '  --header \'Content-Type: application/json\' \\', delay: 300 },
    { type: "command", content: '  --data \'{"query": "Steel metallurgy defects analysis"}\'', delay: 400 },
    { type: "data", content: '{"task_id":"7ac5dbd6-6fda-402a-839c-f42db6722255","status":"queued"}', delay: 800 },
    { type: "info", content: "", delay: 1200 },
    { type: "command", content: 'curl --request GET \\', delay: 1400 },
    { type: "command", content: '  --url https://api.yutori.com/v1/research/tasks/7ac5dbd6-... \\', delay: 1500 },
    { type: "data", content: '{"status":"running","view_url":"https://scouts.yutori.com/..."}', delay: 2000 },
    { type: "info", content: "Researching stainless steel defect analysis methods...", delay: 2500 },
    { type: "info", content: "Scanning academic databases...", delay: 3500 },
    { type: "info", content: "Analyzing ASTM standards...", delay: 4500 },
    { type: "info", content: "Compiling research findings...", delay: 5500 },
    { type: "data", content: '{"status":"succeeded","result":"<h3>Steel defect analysis...</h3>"}', delay: 6500 },
    { type: "complete", content: "Research complete - 6 sources found", delay: 7000 },
  ],
  extract: [
    { type: "command", content: 'curl -N -X POST https://mino.ai/v1/automation/run-sse \\', delay: 0 },
    { type: "command", content: '  -H "X-API-Key: sk-mino-***" \\', delay: 100 },
    { type: "command", content: '  -H "Content-Type: application/json" \\', delay: 200 },
    { type: "command", content: '  -d \'{"url":"https://corrosionpedia.com/...","goal":"Extract defect info"}\'', delay: 300 },
    { type: "data", content: 'data: {"type":"STARTED","runId":"55c819e7-95be-4ca3-ba18-1b1cc23407a9"}', delay: 700 },
    { type: "data", content: 'data: {"type":"STREAMING_URL","runId":"55c819e7...","streamingUrl":"https://ip-54-183-146-219.tetra-data.production.tinyfish.io/..."}', delay: 1200 },
    { type: "data", content: 'data: {"type":"PROGRESS","purpose":"Navigate to the defect page"}', delay: 1800 },
    { type: "data", content: 'data: {"type":"PROGRESS","purpose":"Extract stainless steel defect info"}', delay: 2500 },
    { type: "data", content: 'data: {"type":"PROGRESS","purpose":"Understand page content for extraction"}', delay: 3200 },
    { type: "data", content: 'data: {"type":"HEARTBEAT","timestamp":"2026-01-17T00:03:39.071Z"}', delay: 4000 },
    { type: "data", content: 'data: {"type":"PROGRESS","purpose":"Extract all defect information"}', delay: 4800 },
    { type: "data", content: 'data: {"type":"COMPLETE","status":"COMPLETED","resultJson":{"defect_name":"Sensitization","description":"Loss of alloy integrity..."}}', delay: 5800 },
    { type: "complete", content: "Extraction complete - 8 entities, 7 relationships", delay: 6300 },
  ],
  visualize: [
    { type: "command", content: 'curl -X POST https://api.freepik.com/v1/ai/mystic \\', delay: 0 },
    { type: "command", content: '  -H "x-freepik-api-key: ***" \\', delay: 100 },
    { type: "command", content: '  -H "Content-Type: application/json" \\', delay: 200 },
    { type: "command", content: '  -d \'{"prompt":"Microscopy image of steel grain boundary...","resolution":"2k"}\'', delay: 300 },
    { type: "data", content: '{"data":{"task_id":"img-78a9b2c3","status":"IN_PROGRESS"}}', delay: 800 },
    { type: "info", content: "Generating microscopy visualization...", delay: 1500 },
    { type: "info", content: "Rendering grain boundary structures...", delay: 2500 },
    { type: "info", content: "Applying chromium depletion visualization...", delay: 3500 },
    { type: "data", content: 'GET /v1/ai/mystic/img-78a9b2c3', delay: 4200 },
    { type: "data", content: '{"data":{"status":"COMPLETED","generated":[{"url":"https://..."}]}}', delay: 5000 },
    { type: "complete", content: "Visualization complete - 1 image generated", delay: 5500 },
  ],
  synthesize: [
    { type: "command", content: '# Tonic Fabricate - Generating synthetic training data', delay: 0 },
    { type: "command", content: 'tonic-fabricate generate --schema steel_defect_inspection \\', delay: 200 },
    { type: "command", content: '  --count 50 --format csv', delay: 300 },
    { type: "info", content: "", delay: 500 },
    { type: "data", content: 'Initializing Tonic Fabricate engine...', delay: 700 },
    { type: "data", content: 'Loading schema: ncr_id, date, steel_grade, defect_type, temperature_celsius...', delay: 1200 },
    { type: "data", content: 'Applying domain constraints: steel grades [304, 316, 321, 347, 2205]', delay: 1800 },
    { type: "data", content: 'Applying domain constraints: defect types [SCC, Pitting, PASCC, Sensitization]', delay: 2400 },
    { type: "data", content: 'Generating record 1/50: QA-MET-001, 347, SCC, 80°C...', delay: 3000 },
    { type: "data", content: 'Generating record 10/50: QA-MET-010, 2205, Pitting, 71°C...', delay: 3600 },
    { type: "data", content: 'Generating record 25/50: QA-MET-025, 304, SCC, 156°C...', delay: 4200 },
    { type: "data", content: 'Generating record 50/50: QA-MET-050, 304, SCC, 126°C...', delay: 4800 },
    { type: "data", content: 'Validating data quality...', delay: 5200 },
    { type: "data", content: 'Export: tonic_steel_defect_inspections.csv (50 records)', delay: 5600 },
    { type: "complete", content: "Synthesis complete - 50 records generated", delay: 6000 },
  ],
  generate: [
    { type: "command", content: '# Cline - Generating AI Agent', delay: 0 },
    { type: "command", content: 'cline generate --domain "steel-metallurgy-defect-analysis" \\', delay: 200 },
    { type: "command", content: '  --knowledge ./research.json --entities ./extract.json', delay: 300 },
    { type: "info", content: "", delay: 500 },
    { type: "data", content: 'Analyzing domain knowledge...', delay: 800 },
    { type: "data", content: 'Building system prompt from 4 defect types, 8 entities...', delay: 1400 },
    { type: "data", content: 'Incorporating ASTM test standards: A262, G36, G48, G35...', delay: 2000 },
    { type: "data", content: 'Adding temperature ranges and prevention methods...', delay: 2600 },
    { type: "data", content: 'Generating agent capabilities: defect-classification, severity-assessment...', delay: 3200 },
    { type: "data", content: 'Building agent code: steelDefectAgent.ts...', delay: 3800 },
    { type: "data", content: 'Validating agent responses...', delay: 4400 },
    { type: "complete", content: "Agent generation complete - Ready to deploy", delay: 5000 },
  ],
};

const colorClasses: Record<string, { text: string; border: string; bg: string }> = {
  orange: { text: "text-accent-orange", border: "border-accent-orange/30", bg: "bg-accent-orange/10" },
  blue: { text: "text-accent-blue", border: "border-accent-blue/30", bg: "bg-accent-blue/10" },
  purple: { text: "text-accent-purple", border: "border-accent-purple/30", bg: "bg-accent-purple/10" },
  green: { text: "text-accent-green", border: "border-accent-green/30", bg: "bg-accent-green/10" },
  cyan: { text: "text-accent-cyan", border: "border-accent-cyan/30", bg: "bg-accent-cyan/10" },
};

export function StepProgress({ stage, tool, color }: StepProgressProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const lines = stageTerminalLines[stage] || [];
  const colors = colorClasses[color];

  useEffect(() => {
    setVisibleLines(0);
    const timers: NodeJS.Timeout[] = [];

    lines.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [stage, lines]);

  // Auto-scroll to bottom when new lines appear
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const getLineColor = (type: string) => {
    switch (type) {
      case "command":
        return "text-accent-cyan";
      case "data":
        return "text-text-secondary";
      case "complete":
        return colors.text;
      case "info":
        return "text-text-muted";
      default:
        return "text-text-secondary";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className={`bg-background-card border ${colors.border} rounded-2xl overflow-hidden`}>
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-background-secondary border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-text-muted text-sm font-mono ml-2">
            {tool} — {stage.charAt(0).toUpperCase() + stage.slice(1)} Stage
          </span>
          <div className="ml-auto flex items-center gap-2">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`w-2 h-2 rounded-full ${colors.bg.replace('/10', '')}`}
            />
            <span className="text-text-muted text-xs">Running...</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="p-4 font-mono text-sm h-80 overflow-y-auto bg-[#0d0d0f]"
        >
          <div className="text-text-muted mb-2">$ # DomainLens Pipeline - {stage.toUpperCase()}</div>
          {lines.slice(0, visibleLines).map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${getLineColor(line.type)} ${line.type === "complete" ? "font-semibold mt-2" : ""}`}
            >
              {line.type === "command" && <span className="text-accent-green">$ </span>}
              {line.type === "data" && <span className="text-text-muted">  </span>}
              {line.type === "complete" && <span className="text-accent-green">✓ </span>}
              {line.type === "info" && line.content && <span className="text-text-muted">→ </span>}
              <span className={line.type === "data" ? "text-amber-400/90" : ""}>
                {line.content}
              </span>
            </motion.div>
          ))}
          {visibleLines < lines.length && (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-text-primary"
            >
              ▌
            </motion.span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-background-secondary">
          <motion.div
            className={`h-full ${colors.bg.replace('/10', '')}`}
            initial={{ width: "0%" }}
            animate={{ width: `${(visibleLines / lines.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
