import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#FFFFFF",
        muted: "#888888",
        border: "#222222",
        hover: "#111111",
      },
      fontFamily: {
        sans: ["var(--font-satoshi)", "sans-serif"],
        display: ["var(--font-satoshi)", "sans-serif"],
      },
      letterSpacing: {
        label: "0.24em",
      },
    },
  },
  plugins: [],
};

export default config;