"use client";

import { HTMLAttributes, forwardRef } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
  color?: "orange" | "blue" | "purple" | "green" | "cyan" | "red" | "gray";
  size?: "sm" | "md";
}

const colors = {
  orange: {
    default: "bg-accent-orange/20 text-accent-orange",
    outline: "border-accent-orange/50 text-accent-orange",
  },
  blue: {
    default: "bg-accent-blue/20 text-accent-blue",
    outline: "border-accent-blue/50 text-accent-blue",
  },
  purple: {
    default: "bg-accent-purple/20 text-accent-purple",
    outline: "border-accent-purple/50 text-accent-purple",
  },
  green: {
    default: "bg-accent-green/20 text-accent-green",
    outline: "border-accent-green/50 text-accent-green",
  },
  cyan: {
    default: "bg-accent-cyan/20 text-accent-cyan",
    outline: "border-accent-cyan/50 text-accent-cyan",
  },
  red: {
    default: "bg-accent-red/20 text-accent-red",
    outline: "border-accent-red/50 text-accent-red",
  },
  gray: {
    default: "bg-background-elevated text-text-secondary",
    outline: "border-border-light text-text-secondary",
  },
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = "default",
      color = "gray",
      size = "sm",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center justify-center
          font-medium font-body rounded-full
          ${variant === "outline" ? "border bg-transparent" : ""}
          ${colors[color][variant]}
          ${sizes[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
