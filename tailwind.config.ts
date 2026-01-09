import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        slideIn: "slideIn 0.5s ease-out",
        scroll: "scroll 20s linear infinite",
      },
      backgroundImage: {
        heroImg: "url('/k100.webp')",
      },
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        card: {
          DEFAULT: "rgb(var(--color-background) / <alpha-value>)",
          foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--color-background) / <alpha-value>)",
          foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "rgb(var(--color-button) / <alpha-value>)",
          foreground: "rgb(var(--color-button-text) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--color-secondary-button) / <alpha-value>)",
          foreground: "rgb(var(--color-secondary-button-text) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--color-secondary-button) / <alpha-value>)",
          foreground: "rgb(var(--color-badge-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--color-background-contrast) / <alpha-value>)",
          foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(153 27 27 / <alpha-value>)", // standardized red-800
          foreground: "rgb(255 255 255 / <alpha-value>)",
        },
        border: "rgb(var(--color-badge-border) / <alpha-value>)",
        input: "rgb(var(--color-badge-border) / <alpha-value>)",
        ring: "rgb(var(--color-button) / <alpha-value>)",
        chart: {
          "1": "rgb(var(--chart-1) / <alpha-value>)",
          "2": "rgb(var(--chart-2) / <alpha-value>)",
          "3": "rgb(var(--chart-3) / <alpha-value>)",
          "4": "rgb(var(--chart-4) / <alpha-value>)",
          "5": "rgb(var(--chart-5) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
export default config;
