"use client";

import { motion } from "framer-motion";
import { usePipelineStore } from "@/stores/pipelineStore";
import { StepIcon } from "./StepIcon";
import { PIPELINE_STAGES } from "@/lib/constants";

export function PipelineSteps() {
  const { steps, currentStage } = usePipelineStore();

  if (currentStage === "idle") return null;

  const completedCount = steps.filter((s) => s.status === "completed").length;
  const progressPercentage = (completedCount / steps.length) * 100;

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          {/* Progress bar background */}
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-border" />

          {/* Progress bar fill */}
          <motion.div
            className="absolute top-6 left-6 h-0.5 bg-gradient-to-r from-accent-orange via-accent-blue to-accent-cyan"
            initial={{ width: 0 }}
            animate={{ width: `calc(${progressPercentage}% - 48px)` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const stageInfo = PIPELINE_STAGES.find((s) => s.stage === step.stage);
              const color = (step.color as "orange" | "blue" | "purple" | "green" | "cyan") || "orange";

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center"
                  data-step={step.id}
                  data-status={step.status}
                >
                  <StepIcon
                    name={step.name}
                    color={color}
                    status={step.status}
                  />
                  <div className="mt-3 text-center">
                    <p
                      className={`font-medium text-sm ${
                        step.status === "active"
                          ? "text-text-primary"
                          : step.status === "completed"
                            ? "text-text-secondary"
                            : "text-text-muted"
                      }`}
                    >
                      {step.name}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {stageInfo?.tool}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
