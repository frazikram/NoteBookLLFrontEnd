import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(222.2 84% 4.9%)",
        foreground: "hsl(210 40% 98%)",
        muted: {
          DEFAULT: "hsl(217.2 32.6% 17.5%)",
          foreground: "hsl(215 20.2% 65.1%)"
        },
        primary: {
          DEFAULT: "hsl(222.2 47.4% 11.2%)",
          foreground: "hsl(210 40% 98%)"
        }
      }
    }
  },
  plugins: []
};

export default config;
