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
        background: {
          DEFAULT: '#1a1a1a',
          secondary: '#242424',
          tertiary: '#2a2a2a',
        },
        foreground: {
          DEFAULT: '#e8e8e8',
          secondary: '#a8a8a8',
          tertiary: '#888888',
        },
        border: {
          DEFAULT: '#333333',
          secondary: '#404040',
        },
        accent: {
          DEFAULT: '#67d78e',
          hover: '#58c77d',
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
