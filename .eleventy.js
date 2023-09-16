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

  eleventyConfig.addGlobalData("filesDomain", process.env.FILES_DOMAIN)
  eleventyConfig.addGlobalData("deployDomain", process.env.DEPLOY_DOMAIN)
  eleventyConfig.addGlobalData("sourceJSON", process.env.DATA_JSON_URL)

  return {
    dir: { input: "source", output: "_site" }
  };
};
