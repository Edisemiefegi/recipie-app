/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
     
      colors: {
        primary:{
          DEFAULT: '#FF3C24',
          light: '#FEE0DC'
        }
        }
  
    },
  },
  plugins: [],
}

