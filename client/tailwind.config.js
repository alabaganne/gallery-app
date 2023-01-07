/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: '#24293F',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        old: ['Old English Text MT', 'sans-serif'],
        mont: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
