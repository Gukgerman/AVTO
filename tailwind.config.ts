import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0e141d",
        "navy-dark": "#080b12",
        amber: "#f29e2e",
        gray: {
          DEFAULT: "#6b7078",
        },
        border: {
          DEFAULT: "#e5e5e8",
        },
        surface: {
          light: "#f4f4f5",
        },
      },
      fontFamily: {
        display: ["var(--font-unbounded)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        container: "1600px",
      },
      borderRadius: {
        card: "24px",
        pill: "100px",
      },
    },
  },
  plugins: [],
};

export default config;
