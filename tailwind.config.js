const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        "press-start": ['"Press Start 2P"', "cursive"],
        vt323: [
          "VT323",
          "ui-monospace",
          "system-ui",
          "Courier New",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },
      colors: {
        primary: "#92C300",
      },
    },
  },
  plugins: [],
};
