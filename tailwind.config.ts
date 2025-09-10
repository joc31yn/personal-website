import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        waterlooYellow: "#fdd653",
      },
      fontFamily: {
        caveat: ["var(--font-caveat)", "sans-serif"],
        sora: ["var(--font-sora)", "sans-serif"],
        lato: ["var(--font-lato)", "sans-serif"],
        cinzel: ["var(--font-cinzel)", "serif"],
        cinzelDecorative: ["var(--font-cinzelDecorative)", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
