module.exports = class BucketImage {
  #record

  constructor(record) {
    this.record = record
  }

  get _image() {
    return this.record.fields.Image[0]
  }

  get original() {
    const path = this.name
    const {height, url, width} = this._image

    return {
      height,
      path,
      sourceUrl: url,
      url: `/${path}`,
      width,
    }
  }

  get thumbnail() {
    const path = `thumb-${this.name}`
    const height = this._image.thumbnails?.height || this.original.height
    const width = this._image.thumbnails?.width || this.original.width
    const url = this._image.thumbnails?.url || this.original.sourceUrl

    return {
      height,
      path,
      sourceUrl: url,
      url: `/${path}`,
      width,
    }
  }

  get name() {
    return this.record.fields.Name
  }

  get date() {
    return this.record.fields.Date
  }

  get type() {
    return this._image.type
  }
}
