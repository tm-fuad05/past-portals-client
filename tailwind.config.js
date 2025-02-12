/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primaryRed: "#E63946",
        darkRed: "#C92A2A",
        lightRed: "#FF6F61",
        rosePink: "#F8AFA6",
        deepPink: "#9B2226",
        accentRed: "#D62828",
        softRedBg: "#FFF5F5",
      },
      gradientColorStops: {
        redStart: "#FF6F61",
        redEnd: "#E63946",
        pinkStart: "#F8AFA6",
        pinkEnd: "#FF6F61",
      },
      fontFamily: {
        poppins: "Poppins",
        aldrich: "Aldrich",
      },
    },
  },
  plugins: [require("daisyui")],
};
