/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fade: "fadeIn .3s ease-in-out",
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "primary-gray": "#383C46",
        "secondary-gray": "#595E69",
        gold: "#F9D090",
        "dark-gray": "#4B4E56",
        "light-gray": "#B7B1B1",
        "secondary-white": "#F8F8F8",
      },
      textColor: {
        primary: "#E3E3E3",
        "faded-gray": "#C8C8C8",
      },
      translate: {
        7.5: "30px",
      },
      padding: {
        7.5: "30px",
        15: "60px",
        18: "72px",
      },
      height: {
        51: "204px",
        18.5: "74px",
      },
      lineHeight: {
        3.5: "14px",
        4.5: "18px",
      },
      gap: {
        2.25: "9px",
        7.5: "30px",
      },
    },
  },
  plugins: [],
};
