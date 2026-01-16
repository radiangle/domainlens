"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof HTMLMotionProps<"button">> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const variants = {
  primary:
    "bg-gradient-to-r from-accent-orange to-accent-blue text-white hover:shadow-lg hover:shadow-accent-orange/20",
  secondary:
    "bg-background-card border border-border text-text-primary hover:border-border-light hover:bg-background-elevated",
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary hover:bg-background-card",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center gap-2
          font-body font-medium rounded-xl
          transition-all duration-300 ease-out
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
