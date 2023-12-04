const EleventyFetch = require("@11ty/eleventy-fetch")

module.exports = class Bucket {
  #jsonURL
  images = []

  constructor({jsonURL} = {}) {
    this.jsonURL = jsonURL || process.env.DATA_JSON_URL
  }

  async fetchPage() {
    return EleventyFetch(this.jsonURL, {
      duration: "1h",
      type: "json",
      verbose: true,
    })
  }

  async fetchResults() {
    console.log("Fetching image metadata…", {url: this.jsonURL})
    let response = await this.fetchPage()

    for (let record of Object.values(response.images)) {
      this.images.push({
        name: record.name,
        type: record.type,
        url: record.name,
        thumbnail: record.thumbnail.path,
        privateUrlOriginal: record.path,
        privateUrlThumbnail: record.thumbnail.path,
      })
    }
  }
}
