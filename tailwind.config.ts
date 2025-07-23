import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-slow': 'pulseSlow 2s infinite',
        'blink': 'blink 1s step-end infinite',
      },
      boxShadow: {
        'neon-green': '0 0 5px var(--neon-green), 0 0 10px var(--neon-green), 0 0 20px var(--neon-green), 0 0 40px var(--neon-green)',
        'neon-blue': '0 0 5px var(--neon-blue), 0 0 10px var(--neon-blue), 0 0 20px var(--neon-blue), 0 0 40px var(--neon-blue)',
        'neon-red': '0 0 5px var(--neon-red), 0 0 10px var(--neon-red), 0 0 20px var(--neon-red), 0 0 40px var(--neon-red)',
      },
      colors: {
        'neon-green': 'var(--neon-green)',
        'neon-blue': 'var(--neon-blue)',
        'neon-purple': 'var(--neon-purple)',
        'neon-red': 'var(--neon-red)',
      },
    },
  },
  plugins: [],
};
export default config;
