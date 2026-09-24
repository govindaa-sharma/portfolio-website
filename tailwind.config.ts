import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0A0E14",
        surface: "#10141C",
        surface2: "#161B25",
        line: "#232936",
        ink: "#E8EAED",
        muted: "#8B93A1",
        faint: "#5A6270",
        signal: "#F5A623",
        trace: "#4FD1C5",
        danger: "#E5484D",
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "42rem",
        col: "54rem",
      },
    },
  },
  plugins: [],
};
export default config;
