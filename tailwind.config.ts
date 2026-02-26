import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crystalBlue: "#1a3c6e",
        crystalBlueDark: "#12325a",
        crystalGray: "#f2f4f7",
      },
      boxShadow: {
        floating: "0 20px 40px rgba(16, 24, 40, 0.18)",
      },
      keyframes: {
        floatIn: {
          "0%": { opacity: "0", transform: "translateY(12px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        floatOut: {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(12px) scale(0.98)" },
        },
        glowShift: {
          "0%, 100%": { opacity: "0.45", transform: "translateY(0px) scale(1)" },
          "50%": { opacity: "0.8", transform: "translateY(-8px) scale(1.05)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        dotPulse: {
          "0%": { opacity: "0.2", transform: "translateY(0)" },
          "50%": { opacity: "1", transform: "translateY(-2px)" },
          "100%": { opacity: "0.2", transform: "translateY(0)" },
        },
      },
      animation: {
        floatIn: "floatIn 220ms ease-out",
        floatOut: "floatOut 180ms ease-in",
        glowShift: "glowShift 6s ease-in-out infinite",
        floatSlow: "floatSlow 8s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
        dotPulse: "dotPulse 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
