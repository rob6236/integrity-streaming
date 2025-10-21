// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: "#7B0F24",
          900: "#5f0b1b",
          800: "#6d0d20",
          700: "#7B0F24",
        },
        gold: {
          DEFAULT: "#FFD700",
          50: "#fff9cc",
          100: "#fff199",
          200: "#ffe866",
          300: "#ffdf33",
          400: "#FFD700",
          500: "#e6c200",
          600: "#c9a900",
        },
        ivory: "#FFF9F0",
      },
      boxShadow: {
        goldGlow:
          "0 0 0 1px rgba(255,215,0,0.9), 0 0 16px rgba(255,215,0,0.25)",
        goldGlowSoft:
          "0 0 0 1px rgba(255,215,0,0.6), 0 0 10px rgba(255,215,0,0.18)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(.2,.8,.2,1)",
      },
    },
  },
  plugins: [],
};
