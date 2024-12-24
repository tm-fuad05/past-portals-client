/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        poppins: "Poppins",
        aldrich: "Aldrich",
      },
    },
  },
  plugins: [require("daisyui")],
};
