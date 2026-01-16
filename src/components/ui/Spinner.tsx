"use client";

import { HTMLAttributes, forwardRef } from "react";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  color?: "orange" | "blue" | "purple" | "green" | "cyan" | "white";
}

const spinnerSizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const spinnerColors = {
  orange: "text-accent-orange",
  blue: "text-accent-blue",
  purple: "text-accent-purple",
  green: "text-accent-green",
  cyan: "text-accent-cyan",
  white: "text-white",
};

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = "md", color = "orange", className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={`${className}`}
        {...props}
      >
        <svg
          className={`animate-spin ${spinnerSizes[size]} ${spinnerColors[color]}`}
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
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

Spinner.displayName = "Spinner";
