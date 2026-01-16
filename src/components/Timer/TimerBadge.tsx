"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui";
import { useTimer } from "@/hooks/useTimer";
import { usePipelineStore } from "@/stores/pipelineStore";

export function TimerBadge() {
  const { startTime, currentStage } = usePipelineStore();
  const { formatted } = useTimer(startTime);

  const isVisible = currentStage !== "idle";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-50"
        >
          <Badge
            color={currentStage === "complete" ? "green" : "orange"}
            size="md"
            className="flex items-center gap-2 px-4 py-2 shadow-lg"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-mono">{formatted}</span>
          </Badge>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
