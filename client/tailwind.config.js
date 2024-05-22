/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        16: "repeat(16, minmax(0, 1fr))",
      },
      colors: {
        sideBar: "#4C5554",
        mainBG: "#F5F5F7",
        colarC: "#FF715B",
        blueC: "#1EA896",
        brownC: "#523F38",
      },
    },
  },
  plugins: [],
};
