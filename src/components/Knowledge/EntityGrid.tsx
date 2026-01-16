"use client";

import { motion } from "framer-motion";
import { Card, Badge } from "@/components/ui";
import type { Entity } from "@/lib/types";

interface EntityGridProps {
  entities: Entity[];
}

const typeColors: Record<string, "orange" | "blue" | "purple" | "green" | "cyan" | "red" | "gray"> = {
  Defect: "red",
  Process: "orange",
  Method: "blue",
  Mechanism: "purple",
};

export function EntityGrid({ entities }: EntityGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {entities.map((entity, index) => (
        <motion.div
          key={entity.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <Card accentColor="blue" className="h-full">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-heading font-semibold text-text-primary">
                {entity.name}
              </h4>
              <Badge
                color={typeColors[entity.type] || "gray"}
                size="sm"
              >
                {entity.type}
              </Badge>
            </div>
            <p className="text-sm text-text-secondary">{entity.description}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
