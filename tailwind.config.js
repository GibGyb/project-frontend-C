/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '700px',
      lg: '1024px',
      xl: '1300px',
    },
    extend: {},
  },
  plugins: [require('tailwindcss-animated')],
}
