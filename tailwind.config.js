/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./main.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        redBrand: '#dc2626',
        redDark: '#991b1b',
        redLight: '#fef2f2',
        accentOrange: '#f97316',
        accentYellow: '#f59e0b',
        grayLight: '#f8fafc',
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(220, 38, 38, 0.06), 0 0 0 1px rgba(220, 38, 38, 0.04)',
        'red-glow': '0 10px 30px -5px rgba(220, 38, 38, 0.25)',
      }
    },
  },
  plugins: [],
}
