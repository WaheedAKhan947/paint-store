import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#14275c", 950: "#0a1430", 900: "#0f1e48", 800: "#14275c", 700: "#1d3577", 600: "#2a4a9a" },
        gold: { DEFAULT: "#c8a24a", light: "#e6c877" },
        brand: "#c1121f",
        cream: "#fbf8f3",
        whatsapp: "#25d366",
      },
      fontFamily: {
        display: ["var(--font-sora)", "system-ui"],
        sans: ["var(--font-inter)", "system-ui"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(20,39,92,.06), 0 20px 50px -20px rgba(20,39,92,.35)",
        card: "0 1px 0 rgba(255,255,255,.7) inset, 0 10px 30px -12px rgba(20,39,92,.25)",
      },
      keyframes: {
        marquee: { to: { transform: "translateX(-50%)" } },
        shine: { "0%": { transform: "translateX(-100%)" }, "60%,100%": { transform: "translateX(100%)" } },
        blob: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(6vw,-4vh) scale(1.12)" },
          "66%": { transform: "translate(-4vw,5vh) scale(.92)" },
        },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        "gradient-x": { "0%,100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
        ping2: { "0%": { transform: "scale(1)", opacity: ".7" }, "100%": { transform: "scale(1.9)", opacity: "0" } },
        drip: { "0%": { transform: "scaleY(0)" }, "100%": { transform: "scaleY(1)" } },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "marquee-fast": "marquee 22s linear infinite",
        shine: "shine 3.2s ease-in-out infinite",
        blob: "blob 18s ease-in-out infinite",
        "blob-slow": "blob 26s ease-in-out infinite reverse",
        float: "float 6s ease-in-out infinite",
        "float-delay": "float 7s ease-in-out 1.5s infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        "gradient-x": "gradient-x 6s ease infinite",
        ping2: "ping2 2s cubic-bezier(0,0,.2,1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
