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
    const small = this._image.thumbnails?.small
    const height = small?.height || this.original.height
    const width = small?.width || this.original.width
    const url = small?.url || this.original.sourceUrl

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
