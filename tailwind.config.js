/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["Josefin Sans", "sans-serif"],
      },
      colors: {
        primary: "#151515",
        secondary: "#202020",
        third: "#ffffff1a",
        fourth: "#3b82f6",
      },
    },
  },
  plugins: [],
};
