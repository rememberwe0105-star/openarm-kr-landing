import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          main: "#FFFFFF",
          sub: "#F8F9FA",
        },
        foreground: {
          main: "#0A0A0A",
          sub: "#4B5563",
        },
        point: {
          DEFAULT: "#00C8FF",
          dark: "#0EA5E9",
        },
        border: {
          light: "#E5E7EB",
        }
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
