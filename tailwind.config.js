/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
  ],
  theme: {
    extend: {
      colors: {
        'darkest':'#2e3d4c',
        'primary': '#5a7f9d',
        'secondary': '#a9bed0',
        'lightest': '#eaeff4',
      }
    }
  },
  plugins: [],
};