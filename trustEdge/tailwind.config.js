/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B2545",
          light: "#0E2F52",
          dark: "#173B1E",
        },
        green: {
          brand: "#2F6F3E",
          light: "#5FA968",
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#E4C765",
        },
      },
    },
  },
  plugins: [],
}