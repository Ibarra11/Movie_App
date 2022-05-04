module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: "hsl(0deg, 97%, 63%)",
        darkBlue: "hsl(223deg, 30%, 9%)",
        greyishBlue: "hsl(223deg, 23%, 46%)",
        semiDarkBlue: "hsl(223deg, 36%, 14%)",
        white: "hsl(0deg, 0%, 100%)",
        transparent: "transparent",
      },
    },
  },
  plugins: [],
};
