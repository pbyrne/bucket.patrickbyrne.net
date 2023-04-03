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
        assetsInlineLimit: 0, // Don't inline assets
        rollupOptions: {
          output: {
            assetFileNames: (assetInfo) => {
              if (assetInfo.name?.match(/\.(jpg|gif|png)$/)) {
                console.log(`#assetFileNames: ${assetInfo.name} keep as-is`)
                // keep images as-is (e.g., `/example.gif` because they're deep-linked to elsewhere
                return "[name][extname]"
              } else {
                console.log(`#assetFileNames: ${assetInfo.name} put in assets`)
                // otherwise use the default behavior
                return "assets/[name]-[hash][extname]"
              }
            },
          },
        },
      },
    },
  })

  return {
    dir: { input: "source", output: "_site" }
  };
};
