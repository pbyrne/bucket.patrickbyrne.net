module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget("./config/")
  eleventyConfig.addWatchTarget("./source/javascripts/")

  eleventyConfig.addPassthroughCopy("./source/stylesheets")

  return {
    dir: { input: "source", output: "_site" }
  };
};
