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
    const height = this.record.thumbnail.height
    const width = this.record.thumbnail.width
    const path = this.record.thumbnail.path
    const source = this.record.thumbnail.path

    return {
      height,
      path,
      source,
      url: path,
      width,
    }
  }

  get still() {
    const height = this.record.still.height
    const width = this.record.still.width
    const path = this.record.still.path
    const source = this.record.still.path

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
