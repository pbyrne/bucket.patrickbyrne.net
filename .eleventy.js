const pluginWebc = require("@11ty/eleventy-plugin-webc");

module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget("./config/")
  eleventyConfig.addWatchTarget("./source/javascripts/")

  eleventyConfig.addPassthroughCopy("./source/stylesheets")

  eleventyConfig.addPlugin(pluginWebc)

  return {
    dir: { input: "source", output: "_site" }
  };
};
