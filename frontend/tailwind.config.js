/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        teko: ['Teko', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        primary: {
          DEFAULT: "#FF4D00",
          foreground: "#FFFFFF"
        },
        secondary: {
          DEFAULT: "#0057FF",
          foreground: "#FFFFFF"
        },
        accent: {
          DEFAULT: "#00FF88",
          foreground: "#000000"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "0rem",
        md: "0rem",
        sm: "0rem"
      },
      boxShadow: {
        'brutal': '6px 6px 0px 0px #000000',
        'brutal-sm': '3px 3px 0px 0px #000000',
        'brutal-lg': '12px 12px 0px 0px #000000',
        'brutal-orange': '12px 12px 0px 0px #FF4D00',
      },
      animation: {
        'marquee': 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
}
