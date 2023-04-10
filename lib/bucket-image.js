module.exports = class BucketImage {
  #record

  constructor(record) {
    this.record = record
  }

  get original() {
    const path = this.name
    const {height, width} = this.record
    const source = this.record.path

    return {
      height,
      path,
      source,
      url: path,
      width,
    }
  }

  get thumbnail() {
    const size = "w80"
    const thumb = this.record.thumbnails[size]
    const height = thumb?.height || this.record.height
    const width = thumb?.width || this.record.width
    const path = thumb?.path || this.record.path
    const source = thumb.path

    return {
      height,
      path,
      source,
      url: path,
      width,
    }
  }

  get name() {
    return this.record.name
  }

  get date() {
    return this.record.date
  }

  get type() {
    return this.record.type
  }
}
