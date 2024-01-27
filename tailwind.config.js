/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#4169E1",
        'secondary': "#718FE9",
        'tertiary': "#A0B4F0",
        'quaternary': "#ffffff",
        'quinary': "#454545",
        'senary': "#D9D9D9",
        'septenary': "#F3F3F3",
      }
    },
  },
  plugins: [],
}


