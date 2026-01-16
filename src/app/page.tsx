"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/Hero";
import { PipelineSteps } from "@/components/Pipeline";
import { KnowledgeCard, EntityGrid } from "@/components/Knowledge";
import { VisualGrid } from "@/components/Visuals";
import { DataTable } from "@/components/Data";
import { ChatInterface } from "@/components/Chat";
import { TimerBadge } from "@/components/Timer";
import { usePipeline } from "@/hooks";
import { Badge } from "@/components/ui";

export default function Home() {
  const {
    currentStage,
    research,
    extract,
    visuals,
    synthesize,
    generate,
    error,
    runPipeline,
    isComplete,
  } = usePipeline();

  // Auto-run pipeline when started
  useEffect(() => {
    if (currentStage === "research") {
      runPipeline();
    }
  }, [currentStage, runPipeline]);

  return (
    <div className="min-h-screen">
      <TimerBadge />

      {/* Hero Section */}
      <HeroSection />

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-4xl mx-auto px-4 mb-8"
          >
            <div className="bg-accent-red/10 border border-accent-red/30 rounded-xl p-4 text-accent-red">
              <strong>Error:</strong> {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pipeline Steps */}
      <PipelineSteps />

      {/* Results Sections */}
      <AnimatePresence mode="wait">
        {/* Research Results */}
        {research && (
          <motion.section
            key="research"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 px-4"
          >
            <div className="max-w-6xl mx-auto">
              <SectionHeader
                title="Research Results"
                subtitle="Deep web research via Yutori"
                color="orange"
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <KnowledgeCard
                  title={research.title}
                  summary={research.summary}
                  sources={research.sources}
                  parameters={research.parameters}
                />
                {extract && (
                  <div>
                    <h4 className="font-heading font-semibold text-text-primary mb-4">
                      Extracted Entities
                    </h4>
                    <EntityGrid entities={extract.entities.slice(0, 4)} />
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* Visual Results */}
        {visuals && (
          <motion.section
            key="visuals"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 px-4 bg-background-secondary/30"
          >
            <div className="max-w-6xl mx-auto">
              <SectionHeader
                title="Generated Visuals"
                subtitle="AI imagery via Freepik"
                color="purple"
              />
              <VisualGrid images={visuals.images} />
            </div>
          </motion.section>
        )}

        {/* Synthetic Data */}
        {synthesize && (
          <motion.section
            key="synthesize"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 px-4"
          >
            <div className="max-w-6xl mx-auto">
              <SectionHeader
                title="Synthetic Training Data"
                subtitle="Generated via Tonic Fabricate"
                color="green"
              />
              <DataTable
                records={synthesize.records}
                schema={synthesize.schema}
              />
            </div>
          </motion.section>
        )}

        {/* Chat Interface */}
        {isComplete && generate && (
          <motion.section
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 px-4 bg-background-secondary/30"
          >
            <div className="max-w-4xl mx-auto">
              <SectionHeader
                title="Your AI Agent is Ready"
                subtitle="Generated via Cline"
                color="cyan"
              />
              <ChatInterface systemPrompt={generate.systemPrompt} />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-text-muted text-sm">
            DomainLens - Transform any domain into an expert AI agent
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  color,
}: {
  title: string;
  subtitle: string;
  color: "orange" | "blue" | "purple" | "green" | "cyan";
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="font-heading text-2xl font-bold text-text-primary">
          {title}
        </h2>
        <p className="text-text-secondary mt-1">{subtitle}</p>
      </div>
      <Badge color={color} size="md">
        Complete
      </Badge>
    </div>
  );
}
