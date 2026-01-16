"use client";

import { forwardRef, ReactNode } from "react";
import { motion } from "framer-motion";

export interface CardProps {
  variant?: "default" | "elevated" | "bordered";
  hover?: boolean;
  accentColor?: "orange" | "blue" | "purple" | "green" | "cyan" | "red";
  children?: ReactNode;
  className?: string;
}

const variants = {
  default: "bg-background-card",
  elevated: "bg-background-elevated shadow-lg",
  bordered: "bg-background-card border border-border",
};

const accentColors = {
  orange: "hover:border-accent-orange/50",
  blue: "hover:border-accent-blue/50",
  purple: "hover:border-accent-purple/50",
  green: "hover:border-accent-green/50",
  cyan: "hover:border-accent-cyan/50",
  red: "hover:border-accent-red/50",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = "bordered",
      hover = true,
      accentColor,
      className = "",
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { y: -4 } : undefined}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`
          rounded-2xl p-6
          transition-all duration-300 ease-out
          ${variants[variant]}
          ${hover ? "hover:shadow-lg" : ""}
          ${accentColor ? accentColors[accentColor] : "hover:border-border-light"}
          ${className}
        `}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";
