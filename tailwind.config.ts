import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-satoshi)", "sans-serif"],
        display: ["var(--font-satoshi)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        background: "#000000",
        foreground: "#FFFFFF",
        muted: "#888888",
        border: "#222222",
        hover: "#111111",
      },
      letterSpacing: {
        label: "0.24em",
      },
    },
  },
  plugins: [],
};

export default config;
