/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#232323',
        gray: '#D0D0D0',
        blue: '#7EB0C6',
        red: '#B01212',
      },
    },
  },
  plugins: [],
}

