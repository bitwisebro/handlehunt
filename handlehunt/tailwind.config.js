/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#003366",
        accent: "#4a4e69",
        dark: "#22223b",
      },
    },
  },
  plugins: [],
};

