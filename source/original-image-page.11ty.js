const EleventyFetch = require("@11ty/eleventy-fetch")

class OriginalImage {
  data() {
    return {
      pagination: {
        alias: "image",
        data: "bucket.images",
        size: 1,
      },
      permalink: (ctx) => {
        return `public/${ctx.image.original.path}`
      },
    }
  }

  render(ctx) {
    console.log(`Rendering original for ${ctx.image.name}`)
    return EleventyFetch(ctx.image.original.sourceUrl, {type: "buffer"})
  }
}

module.exports = OriginalImage
