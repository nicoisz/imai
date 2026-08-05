import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#02050d",
          secondary: "#050914",
        },
        surface: {
          DEFAULT: "#080d19",
          elevated: "#0b1120",
        },
        foreground: {
          DEFAULT: "#f2f1ec",
          soft: "#d2d5df",
        },
        muted: "#8d95a8",
        primary: {
          DEFAULT: "#345dff",
          bright: "#5f7dff",
          soft: "#182a73",
        },
        border: {
          DEFAULT: "rgba(180, 195, 255, 0.16)",
          strong: "rgba(180, 195, 255, 0.32)",
        },
        success: "#5bd6a2",
        error: "#ff5d6c",
      },
      borderColor: {
        DEFAULT: "rgba(180, 195, 255, 0.16)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        "ultra-wide": "0.28em",
      },
      maxWidth: {
        editorial: "68ch",
        container: "1600px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "pulse-star": {
          "0%, 100%": { opacity: "0.85", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-6px,0)" },
        },
      },
      animation: {
        "pulse-star": "pulse-star 6s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        "spin-slow": "spin-slow 90s linear infinite",
        "spin-slower": "spin-slow 160s linear infinite reverse",
        drift: "drift 12s cubic-bezier(0.22, 1, 0.36, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
