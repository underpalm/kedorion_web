/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        teko: ['Teko', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        manrope: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

