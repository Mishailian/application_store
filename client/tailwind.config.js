/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        16: "repeat(16, minmax(0, 1fr))",
      },
      colors: {
        sideBar: "var(--color-sideBar)",
        mainBG: "var(--color-mainBG)",
        colarC: "var(--color-colarC)",
        blueC: "var(--color-blueC)",
        brownC: "var(--color-brownC)",
      },
    },
  },
  plugins: [],
};
