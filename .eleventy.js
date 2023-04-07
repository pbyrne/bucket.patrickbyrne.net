const EleventyWebcPlugin = require("@11ty/eleventy-plugin-webc");
const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");

module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget("./config/")
  eleventyConfig.addWatchTarget("./source/javascripts/")

  eleventyConfig.addPassthroughCopy("./source/javascripts")
  eleventyConfig.addPassthroughCopy("./source/stylesheets")

  eleventyConfig.addPlugin(EleventyWebcPlugin)
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      build: {
        assetsInlineLimit: 0, // Don't inline assets, since we want to keep the markup small
        manifest: true,
      },
    },
  })

  eleventyConfig.addGlobalData("filesDomain", "https://bucket-files.byrne.team")
  eleventyConfig.addGlobalData("deployDomain", "https://bucket.patrickbyrne.net")
  eleventyConfig.addGlobalData("sourceJSON", "https://bucket-files.byrne.team/bucket.json")

  return {
    dir: { input: "source", output: "_site" }
  };
};
