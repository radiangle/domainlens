"use client";

import { motion } from "framer-motion";
import type { StepStatus } from "@/stores/pipelineStore";

interface StepIconProps {
  name: string;
  color: "orange" | "blue" | "purple" | "green" | "cyan";
  status: StepStatus;
}

const colorClasses = {
  orange: {
    bg: "bg-accent-orange",
    text: "text-accent-orange",
    border: "border-accent-orange",
    glow: "shadow-accent-orange/30",
  },
  blue: {
    bg: "bg-accent-blue",
    text: "text-accent-blue",
    border: "border-accent-blue",
    glow: "shadow-accent-blue/30",
  },
  purple: {
    bg: "bg-accent-purple",
    text: "text-accent-purple",
    border: "border-accent-purple",
    glow: "shadow-accent-purple/30",
  },
  green: {
    bg: "bg-accent-green",
    text: "text-accent-green",
    border: "border-accent-green",
    glow: "shadow-accent-green/30",
  },
  cyan: {
    bg: "bg-accent-cyan",
    text: "text-accent-cyan",
    border: "border-accent-cyan",
    glow: "shadow-accent-cyan/30",
  },
};

const icons: Record<string, JSX.Element> = {
  Research: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Extract: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
    </svg>
  ),
  Visualize: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Synthesize: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Generate: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
};

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export function StepIcon({ name, color, status }: StepIconProps) {
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`
        relative w-12 h-12 rounded-xl flex items-center justify-center
        transition-all duration-300
        ${status === "completed" ? `${colors.bg} text-white` : ""}
        ${status === "active" ? `border-2 ${colors.border} ${colors.text} shadow-lg ${colors.glow}` : ""}
        ${status === "waiting" ? "border border-border text-text-muted" : ""}
        ${status === "error" ? "border-2 border-accent-red text-accent-red" : ""}
      `}
    >
      {status === "active" && (
        <motion.div
          className={`absolute inset-0 rounded-xl ${colors.bg} opacity-20`}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      {status === "completed" ? <CheckIcon /> : icons[name] || icons.Research}
    </motion.div>
  );
}
