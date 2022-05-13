module.exports = class BucketImage {
  #record

  constructor(record) {
    this.record = record
  }

  get name() {
    return this.record.fields.Name
  }

  get date() {
    return new Date(this.record.fields.Date)
  }

  get images() {
    return this.record.fields.Image
  }

  get image() {
    return this.images[0] || {}
  }

  get url() {
    return this.image.url
  }

  get aspectRatio() {
    return this.width / this.height
  }

  get thumbnail() {
    return this.image.thumbnails?.small ?? {}
  }

  get width() {
    return this.image.width
  }

  get height() {
    return this.image.height
  }

  get type() {
    return this.image.type
  }
}
