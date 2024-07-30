/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "**/*.html"
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      margin: {
        '5px': '5px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

