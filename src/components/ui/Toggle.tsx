"use client";

import { motion } from "framer-motion";

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  labelLeft?: string;
  labelRight?: string;
  disabled?: boolean;
}

export function Toggle({
  enabled,
  onChange,
  labelLeft = "Demo",
  labelRight = "Real APIs",
  disabled = false,
}: ToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`text-sm font-medium transition-colors ${
          !enabled ? "text-text-primary" : "text-text-muted"
        }`}
      >
        {labelLeft}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        disabled={disabled}
        onClick={() => !disabled && onChange(!enabled)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2 focus:ring-offset-background-primary
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${enabled ? "bg-accent-cyan" : "bg-background-secondary border border-border"}
        `}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`
            inline-block h-4 w-4 rounded-full bg-white shadow-lg
            ${enabled ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </button>
      <span
        className={`text-sm font-medium transition-colors ${
          enabled ? "text-text-primary" : "text-text-muted"
        }`}
      >
        {labelRight}
      </span>
    </div>
  );
}
