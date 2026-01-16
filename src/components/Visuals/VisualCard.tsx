"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, Badge, Spinner } from "@/components/ui";
import type { GeneratedImage } from "@/lib/types";

interface VisualCardProps {
  image: GeneratedImage;
  index?: number;
}

export function VisualCard({ image, index = 0 }: VisualCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <Card accentColor="purple" className="overflow-hidden">
        <div className="relative aspect-video bg-background-secondary rounded-lg overflow-hidden mb-4">
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner color="purple" size="lg" />
            </div>
          )}
          {hasError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-background-elevated">
              <MicroscopeVisualization />
            </div>
          ) : (
            <motion.img
              src={image.url}
              alt={image.caption}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              initial={{ scale: 1.1 }}
              animate={{ scale: isLoaded ? 1 : 1.1 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </div>

        <div className="flex items-start justify-between mb-2">
          <p className="text-text-primary font-medium">{image.caption}</p>
          <Badge color="purple" size="sm">
            AI Generated
          </Badge>
        </div>

        <details className="group">
          <summary className="text-sm text-text-muted cursor-pointer hover:text-text-secondary transition-colors">
            View prompt
          </summary>
          <p className="mt-2 text-xs text-text-secondary font-mono bg-background-secondary p-3 rounded-lg">
            {image.prompt}
          </p>
        </details>
      </Card>
    </motion.div>
  );
}

function MicroscopeVisualization() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="relative w-32 h-32">
        {/* Simulated microscope view with CSS */}
        <div className="absolute inset-0 rounded-full border-4 border-accent-purple/30" />
        <div className="absolute inset-4 rounded-full border-2 border-accent-purple/20" />
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-accent-purple/10 to-transparent" />
        {/* Grain boundaries simulation */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <path
            d="M20,30 Q35,25 50,35 T80,30"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-accent-purple/40"
          />
          <path
            d="M25,50 Q40,45 55,55 T85,50"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-accent-purple/40"
          />
          <path
            d="M15,70 Q30,65 45,75 T75,70"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-accent-purple/40"
          />
        </svg>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-text-muted">
          1000x
        </div>
      </div>
    </div>
  );
}
