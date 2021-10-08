module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget("./config/")
  eleventyConfig.addWatchTarget("./source/stylesheets/")
  eleventyConfig.addWatchTarget("./source/javascripts/")

  return {
    dir: { input: "source", output: "_site" }
  };
};

