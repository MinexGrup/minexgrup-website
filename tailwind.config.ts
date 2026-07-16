import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Rich near-black base (never flat #000)
        base: {
          DEFAULT: "#0b0b0d",
          900: "#0b0b0d",
          800: "#111114",
          700: "#17171b",
          600: "#1f1f24",
          500: "#2a2a30"
        },
        // Warm metallic gold — deliberate, premium
        gold: {
          DEFAULT: "#c9a24b",
          bright: "#e6c77e",
          deep: "#a9863a",
          soft: "#d8b96a"
        },
        // Champagne / goldy white for body text & light sections
        champagne: {
          DEFAULT: "#f3ecdd",
          muted: "#cfc6b4",
          dim: "#9a9384"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        tightest: "-0.04em"
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(120deg, #a9863a 0%, #e6c77e 45%, #c9a24b 60%, #a9863a 100%)",
        "fade-base":
          "linear-gradient(180deg, rgba(11,11,13,0) 0%, rgba(11,11,13,0.85) 70%, #0b0b0d 100%)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "spin-slow": "spin 16s linear infinite",
        shimmer: "shimmer 6s linear infinite"
      }
    }
  },
  plugins: []
};
export default config;
