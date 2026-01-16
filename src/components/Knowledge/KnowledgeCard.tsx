"use client";

import { motion } from "framer-motion";
import { Card, Badge } from "@/components/ui";

interface KnowledgeCardProps {
  title: string;
  summary: string;
  sources: string[];
  parameters: Record<string, string>;
  index?: number;
}

export function KnowledgeCard({
  title,
  summary,
  sources,
  parameters,
  index = 0,
}: KnowledgeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <Card accentColor="orange" className="h-full">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-heading text-xl font-semibold text-text-primary">
            {title}
          </h3>
          <Badge color="orange" size="sm">
            Research
          </Badge>
        </div>

        <p className="text-text-secondary mb-6 leading-relaxed">{summary}</p>

        <div className="mb-6">
          <h4 className="font-heading text-sm font-medium text-text-primary mb-3">
            Key Parameters
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(parameters).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-start py-2 border-b border-border last:border-0"
              >
                <span className="text-text-muted text-sm">{key}</span>
                <span className="text-text-primary text-sm font-mono text-right max-w-[60%]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-sm font-medium text-text-primary mb-3">
            Sources ({sources.length})
          </h4>
          <ul className="space-y-1">
            {sources.map((source, i) => (
              <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                <span className="text-accent-orange">•</span>
                <span className="hover:text-text-primary transition-colors cursor-pointer">
                  {source}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </motion.div>
  );
}
