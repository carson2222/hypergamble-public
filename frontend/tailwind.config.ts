/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xsm: "400px",
      },
      colors: {
        background: "#0A1116",
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#5FE8B1",
          dark: "#4CD9A4",
          light: "rgba(95, 232, 177, 0.1)",
        },
        secondary: {
          DEFAULT: "#1a2329",
          dark: "#2a333a",
          light: "rgba(255,255,255, 0.25)",
        },
        accent: {
          DEFAULT: "#5FE8B1",
          dark: "#4CD9A4",
        },
        muted: {
          DEFAULT: "#2a333a",
          light: "rgba(95, 232, 177, 0.1)",
        },
        border: "#2a333a",
        input: "#2a333a",
        ring: "#5FE8B1",
        textGray: "#9CA3AF",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "custom-light": "0 4px 6px -1px rgba(95, 232, 177, 0.1), 0 2px 4px -1px rgba(95, 232, 177, 0.06)",
        "custom-dark": "0 4px 6px -1px rgba(42, 51, 58, 0.1), 0 2px 4px -1px rgba(42, 51, 58, 0.06)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwindcss-textshadow")],
} satisfies Config;
