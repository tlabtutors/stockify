/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,css}", // Needed for App Router support
    "./components/**/*.{js,ts,jsx,tsx}", // If you have components
    "./node_modules/@shadcn/ui/**/*.{ts,tsx}", // required for shadcn/ui
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-animate")], //optional for shandcn
};
