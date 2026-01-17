"use client";

import { motion } from "framer-motion";
import { Badge, Toggle } from "@/components/ui";
import { DomainInput } from "./DomainInput";
import { usePipelineStore } from "@/stores/pipelineStore";

export function HeroSection() {
  const { useRealAPIs, setUseRealAPIs, currentStage } = usePipelineStore();
  const isRunning = currentStage !== "idle" && currentStage !== "complete";

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            color="orange"
            size="md"
            className="mb-6 inline-flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-orange" />
            </span>
            AI Agent Generator
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-text-primary via-text-primary to-text-secondary bg-clip-text"
        >
          DomainLens
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-body text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto"
        >
          Transform any domain description into a working, expert-level AI agent
          in under 5 minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <DomainInput />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 flex justify-center"
        >
          <div className="bg-background-card border border-border rounded-xl px-4 py-3">
            <Toggle
              enabled={useRealAPIs}
              onChange={setUseRealAPIs}
              labelLeft="Demo Mode"
              labelRight="Real APIs"
              disabled={isRunning}
            />
            {useRealAPIs && (
              <p className="text-xs text-text-muted mt-2">
                Requires API keys in .env.local
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
