/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      'gray':'rgba( 31,35,41 ,0.1)',
      'light-gray': '#e3e5e6',
      'blue':'rgba( 20,86,240 ,0.15)'
    },
    extend: {},
  },
  plugins: [],
}

