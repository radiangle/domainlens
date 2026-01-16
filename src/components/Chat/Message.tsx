"use client";

import { motion } from "framer-motion";
import type { ChatMessage } from "@/lib/types";

interface MessageProps {
  message: ChatMessage;
  index?: number;
}

export function Message({ message, index = 0 }: MessageProps) {
  const isAgent = message.role === "agent";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className={`flex ${isAgent ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isAgent
            ? "bg-background-card border border-border rounded-bl-sm"
            : "bg-gradient-to-r from-accent-orange to-accent-blue text-white rounded-br-sm"
        }`}
      >
        {isAgent && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-accent-cyan/20 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-accent-cyan"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-xs font-medium text-accent-cyan">
              Steel Defect Analyzer
            </span>
          </div>
        )}
        <div
          className={`text-sm leading-relaxed whitespace-pre-wrap ${
            isAgent ? "text-text-primary" : "text-white"
          }`}
        >
          {message.content}
        </div>
      </div>
    </motion.div>
  );
}
