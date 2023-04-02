const EleventyFetch = require("@11ty/eleventy-fetch")

class ThumbnailImage {
  data() {
    return {
      pagination: {
        alias: "image",
        data: "bucket.images",
        size: 1,
      },
      permalink: (ctx) => {
        return ctx.image.thumbnail.path
      },
    }
  }

  render(ctx) {
    console.log(`Rendering tumbnail for ${ctx.image.name}`)
    return EleventyFetch(ctx.image.thumbnail.sourceUrl, {type: "buffer"})
  }
}

module.exports = ThumbnailImage
