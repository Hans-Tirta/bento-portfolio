/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        discord: {
          soft: "#7289DA",
          muted: "#4E5D94",
          light: "#FFFFFF",
          deep: "#2C2F33",
        },
      },
      fontFamily: {
        jp: ["Inter", "sans-serif"],
      },
      animation: {
        draw: "draw 1.8s ease-out forwards",
      },
    },
  },
  plugins: [
    // Optional scrollbar plugin
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
