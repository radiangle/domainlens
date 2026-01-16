"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Button, Input } from "@/components/ui";
import { usePipelineStore } from "@/stores/pipelineStore";
import { DEFAULT_DOMAIN } from "@/lib/constants";

export function DomainInput() {
  const [inputValue, setInputValue] = useState(DEFAULT_DOMAIN);
  const [error, setError] = useState<string | undefined>();
  const { setDomain, startPipeline, currentStage } = usePipelineStore();

  const isRunning = currentStage !== "idle" && currentStage !== "complete";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      setError("Please enter a domain description");
      return;
    }

    if (inputValue.trim().length < 10) {
      setError("Please provide a more detailed description (at least 10 characters)");
      return;
    }

    setError(undefined);
    setDomain(inputValue.trim());
    startPipeline();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (error) setError(undefined);
            }}
            placeholder="Describe your AI agent domain..."
            accentColor="orange"
            error={error}
            disabled={isRunning}
            aria-label="Domain description"
          />
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            size="lg"
            isLoading={isRunning}
            disabled={isRunning}
            className="w-full sm:w-auto whitespace-nowrap"
          >
            {isRunning ? "Generating..." : "Generate Agent"}
          </Button>
        </motion.div>
      </div>

      <p className="mt-4 text-sm text-text-muted">
        Example: &quot;Build an AI agent for steel metallurgy defect analysis&quot;
      </p>
    </form>
  );
}
