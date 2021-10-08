module.exports = {
  purge: {
    content: ["./_site/**/*.html"],
    options: {
      safelist: [],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple: {
          10: "#f0eef0",
          50: "#bebed4",
          200: "#a6a5c3",
          300: "#8f8eb4",
          400: "#7271a1",
          500: "#5b5882",
          600: "#4d486f",
          700: "#3e385b",
          800: "#312948",
          900: "#221834"
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
