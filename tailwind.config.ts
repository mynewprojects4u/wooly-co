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
        background: "var(--background)",
        foreground: "var(--foreground)",
        oat: "#F5EEE3",
        raspberry: "#B7395A",
        "raspberry-deep": "#97294A",
        rose: "#EFC4CE",
        sage: "#B9CBA6",
        ink: "#3D3129",
        line: "#EADFCF",
      },
      fontFamily: {
        fraunces: ['var(--font-fraunces)', 'serif'],
        karla: ['var(--font-karla)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
