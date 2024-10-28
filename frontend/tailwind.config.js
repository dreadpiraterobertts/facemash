/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    content:{
      checked:'./src/assets/checked.png'
    }
  },
  plugins: [],
}

