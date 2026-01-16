"use client";

import { forwardRef, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  accentColor?: "orange" | "blue" | "purple" | "green" | "cyan";
}

const focusColors = {
  orange: "focus:ring-accent-orange/50 focus:border-accent-orange",
  blue: "focus:ring-accent-blue/50 focus:border-accent-blue",
  purple: "focus:ring-accent-purple/50 focus:border-accent-purple",
  green: "focus:ring-accent-green/50 focus:border-accent-green",
  cyan: "focus:ring-accent-cyan/50 focus:border-accent-cyan",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, accentColor = "orange", className = "", id, ...props },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3
            bg-background-secondary border border-border rounded-xl
            text-text-primary placeholder-text-muted
            font-body text-base
            transition-all duration-300 ease-out
            focus:outline-none focus:ring-2
            ${focusColors[accentColor]}
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-accent-red focus:ring-accent-red/50 focus:border-accent-red" : ""}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-accent-red">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
