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
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        caveat: ["var(--font-caveat)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        sora: ["var(--font-sora)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
