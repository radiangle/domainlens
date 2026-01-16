import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#0a0a0b",
          secondary: "#111113",
          card: "#18181b",
          elevated: "#1f1f23",
        },
        border: {
          DEFAULT: "#27272a",
          light: "#3f3f46",
        },
        text: {
          primary: "#fafafa",
          secondary: "#a1a1aa",
          muted: "#71717a",
        },
        accent: {
          orange: "#f97316",
          blue: "#3b82f6",
          purple: "#a855f7",
          green: "#22c55e",
          cyan: "#06b6d4",
          red: "#ef4444",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-outfit)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
