import type { Config } from "tailwindcss"
const colors = {
  terminal: {
    black: "#0C0C0C",
    blue: "#0037DA",
    cyan: "#3A96DD",
    green: "#13A10E",
    purple: "#881798",
    red: "#C50F1F",
    white: "#CCCCCC",
    yellow: "#C19C00",
    brightBlack: "#767676",
    brightBlue: "#3B78FF",
    brightCyan: "#61D6D6",
    brightGreen: "#16C60C",
    brightPurple: "#B4009E",
    brightRed: "#E74856",
    brightWhite: "#F2F2F2",
    brightYellow: "#F9F1A5",
  },
}

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        ...colors,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        mono: ["Cascadia Code", "Consolas", "monospace"],
      },
      animation: {
        blink: "blink 1s step-end infinite",
        binary: "binary 0.5s infinite",
        pulse: "pulse 1.5s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

