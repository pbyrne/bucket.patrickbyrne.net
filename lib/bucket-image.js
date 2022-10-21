const EleventyImage = require("@11ty/eleventy-img");
const path = require("path")

module.exports = class BucketImage {
  #record
  #converted
  #_fullSize
  #_thumbnail

  constructor(record) {
    this.record = record
  }

  async convert() {
    this.converted = this.converted || await this.processImage({widths: [null, 124]})
    const [key] = Object.keys(this.converted) // With `formats: [null]`, all versions are in same key, with key being the file extension of the format
    let { [key]: [thumb, full] } = this.converted
    full = full || thumb // If original size is smaller than converted width, it's omitted from result
    this._fullSize = this._fullSize || full || thumb
    this._thumbnail = this._thumbnail || thumb
  }

  async processImage({widths} = {}) {
    console.log(`Processing ${this.originalName}…`)
    const urlPath = "/images/"
    const buildDir = "_site"

    return EleventyImage(this.originalUrl, {
      cacheOptions: {
        duration: "1w",
      },
      formats: [null],
      outputDir: `${buildDir}${urlPath}`,
      urlPath: urlPath,
      widths: widths,
    })
  }

  async fullSize() {
    await this.convert()
    return this._fullSize
  }

  async thumbnail() {
    await this.convert()
    return this._thumbnail
  }

  get original() {
    return this.record.fields.Image[0]
  }

  get originalName() {
    return this.record.fields.Name
  }

  get originalUrl() {
    return this.original.url
  }

  get originalType() {
    return this.original.type
  }
}
