/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontWeight:{
        '650':'650',
        '750':'750',
        
      }
      
    },
  },
  plugins: [],
}

