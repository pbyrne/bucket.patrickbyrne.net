const EleventyFetch = require("@11ty/eleventy-fetch")
const BucketImage = require("./bucket-image.js")
const fs = require("fs")

module.exports = class Bucket {
  #jsonURL
  images = []

  constructor({jsonURL} = {}) {
    this.jsonURL = jsonURL || "https://bucket-files.byrne.team/bucket.json"
  }

  async fetchPage() {
    return EleventyFetch(this.jsonURL, {
      duration: "1h",
      type: "json",
      verbose: true,
    })
  }

  async fetchResults(offset) {
    console.log("Fetching image metadata…", {url: this.jsonURL})
    let response = await this.fetchPage()

    for (let record of Object.values(response.images)) {
      this.images.push(new BucketImage(record))
    }
  }
}
