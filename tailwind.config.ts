import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["var(--font-nunito)"],
        montserrat: ["var(--font-montserrat)"]
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          blue: 'hsl(var(--accent-blue))'
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
