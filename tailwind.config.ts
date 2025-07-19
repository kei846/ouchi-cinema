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
        background: '#f6f5f2',
        accent: '#4a90e2',
        sub: '#3e7cab',
      },
      fontFamily: {
        georgia: ['Georgia', 'serif'],
        helvetica: ['"Helvetica Neue"', 'sans-serif'],
        noto: ['"Noto Sans JP"', 'sans-serif'],
        pixel: ['"Courier New"', 'Courier', 'monospace'],
      },
      keyframes: {
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
          "50%": { borderColor: "transparent" },
        },
        fadeIn: {
          "0%": { opacity: '0' },
          "100%": { opacity: '1' },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        sink: {
          "0%": { transform: "translateY(0)", opacity: '1' },
          "100%": { transform: "translateY(20px)", opacity: '0' },
        },
      },
      animation: {
        typing: "typing 3.5s steps(40, end), blink .75s step-end infinite",
        fadeIn: "fadeIn 1.5s ease-in-out forwards",
        float: "float 3s ease-in-out infinite",
        sink: "sink 1s ease-in forwards",
      },
    },
  },
  plugins: [],
};
export default config;
