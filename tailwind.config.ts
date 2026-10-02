import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#17231f",
          forest: "#1f4d3a",
          evergreen: "#123629",
          sage: "#789781",
          gold: "#7f5a1a",
          brass: "#c8a85b",
          cream: "#f7f3ea",
          mist: "#eef3ef",
          linen: "#fbfaf6",
          line: "#d9ded8",
          muted: "#52615b",
          error: "#a13a2f",
          success: "#28744f"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 35, 31, 0.10)",
        card: "0 10px 28px rgba(23, 35, 31, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
