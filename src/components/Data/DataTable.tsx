"use client";

import { motion } from "framer-motion";
import { Card, Badge } from "@/components/ui";

interface DataTableProps {
  records: Array<Record<string, string | number>>;
  schema: Record<string, string>;
}

const severityColors: Record<string, "red" | "orange" | "green" | "gray"> = {
  High: "red",
  Medium: "orange",
  Low: "green",
  None: "gray",
};

export function DataTable({ records, schema }: DataTableProps) {
  const columns = Object.keys(schema);

  return (
    <Card accentColor="green" className="overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg font-semibold text-text-primary">
          Synthetic Training Data
        </h3>
        <Badge color="green" size="sm">
          {records.length} records
        </Badge>
      </div>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th
                  key={col}
                  className="text-left py-3 px-4 text-sm font-medium text-text-secondary"
                >
                  {formatColumnName(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((record, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: rowIndex * 0.05, duration: 0.3 }}
                className="border-b border-border last:border-0 hover:bg-background-secondary/50 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col}
                    className="py-3 px-4 text-sm text-text-primary font-mono"
                  >
                    {col === "severity" ? (
                      <Badge
                        color={severityColors[record[col] as string] || "gray"}
                        size="sm"
                      >
                        {record[col]}
                      </Badge>
                    ) : col === "defect_type" ? (
                      <span
                        className={
                          record[col] === "None"
                            ? "text-text-muted"
                            : "text-accent-red"
                        }
                      >
                        {record[col]}
                      </span>
                    ) : (
                      record[col]
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-text-muted">
          Schema: {columns.map((c) => `${c}: ${schema[c]}`).join(", ")}
        </p>
      </div>
    </Card>
  );
}

function formatColumnName(name: string): string {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
