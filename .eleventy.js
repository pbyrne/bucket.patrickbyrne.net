module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./source/stylesheets")
  eleventyConfig.addPassthroughCopy("./source/javascripts/")

  return {
    dir: { input: "source", output: "_site" }
  };
};
