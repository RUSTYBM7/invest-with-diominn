import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#111315",
        gold: "#d4af37",
        emerald: "#0ea76a",
        fog: "#f5f6f7"
      }
    }
  },
  plugins: []
};
export default config;
