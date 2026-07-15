import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0b0a",
          soft: "#0f120f",
          card: "#131613",
          line: "#20281f",
        },
        // Brand green sampled from the Fit & Lift logo (#2FB730)
        lime: {
          DEFAULT: "#2fb730",
          bright: "#33c134",
          neon: "#54e356",
          deep: "#0d2a10",
        },
      },
      fontFamily: {
        // Latin glyphs use Oswald; Arabic glyphs fall through to Changa (strong/athletic)
        display: [
          "var(--font-display)",
          "var(--font-ar-display)",
          "Impact",
          "sans-serif",
        ],
        // Body: Inter for Latin, Cairo for Arabic
        sans: ["var(--font-sans)", "var(--font-ar)", "system-ui", "sans-serif"],
        ar: ["var(--font-ar)", "Tahoma", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.35" },
          "50%": { opacity: "0.75" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        "marquee-reverse": "marqueeReverse 22s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
