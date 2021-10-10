module.exports = {
  plugins: [
    require("postcss-nesting"),
    require("tailwindcss")("./config/tailwind.config.js"),
    require("autoprefixer"),
  ],
  options: {
    from: "source/stylesheets/site.css",
    // map: dev ? { inline: true } : false
  }
}
