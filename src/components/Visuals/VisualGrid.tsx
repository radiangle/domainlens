"use client";

import { motion } from "framer-motion";
import { VisualCard } from "./VisualCard";
import type { GeneratedImage } from "@/lib/types";

interface VisualGridProps {
  images: GeneratedImage[];
}

export function VisualGrid({ images }: VisualGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {images.map((image, index) => (
        <VisualCard key={index} image={image} index={index} />
      ))}
    </motion.div>
  );
}
