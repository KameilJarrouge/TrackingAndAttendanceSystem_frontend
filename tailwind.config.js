/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      ...colors,
      primary: "#121823",
      primary_light: "#283952",
      primary_dark: "#212C40",
      background: "#F7F7F7",
      background_special: "#D5E8D4",
      background_input: "#E6E6E6",
      accent: "#00C570",
      font: "#C8C8C8",
    },
    extend: {},
  },
  plugins: [],
};
