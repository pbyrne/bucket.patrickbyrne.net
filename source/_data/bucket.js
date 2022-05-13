const EleventyFetch = require("@11ty/eleventy-fetch");

class BucketImage {
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

class Bucket {
  #apiKey
  images = []
  sortOptions = [{field: "Name", direction: "asc"}]
  tableName

  constructor({tableName, sortOptions} = {}) {
    this.apiKey = process.env.AIRTABLE_API_KEY
    this.baseId = process.env.AIRTABLE_BUCKET_BASE_ID
    this.tableName = tableName
    this.sortOptions = sortOptions || this.sortOptions
  }

  get baseUrl() {
    return `https://api.airtable.com/v0/${this.baseId}/${this.tableName}`
  }

  queryUrl(offset) {
    const url = new URL(this.baseUrl)
    const searchParams = new URLSearchParams()

    if (offset) {
      searchParams.set("offset", offset)
    }

    this.sortOptions.forEach(({field, direction}, i) => {
      searchParams.set(`sort[${i}][field]`, field)
      searchParams.set(`sort[${i}][direction]`, direction)
    })

    url.search = searchParams.toString()

    return url.toString()
  }

  async fetchPage(offset) {
    return EleventyFetch(this.queryUrl(offset), {
      duration: "1h",
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        }
      },
      type: "json",
      verbose: true,
    })
  }

  async fetchResults(offset) {
    let response = await this.fetchPage(offset)

    response.records.forEach(record => {
      this.images.push(new BucketImage(record))
    })

    if (response.offset) {
      await this.fetchResults(response.offset)
    }
  }
}

fetchBucket = async function() {
  console.log("Fetch starting…")
  bucket = new Bucket({tableName: "images"})
  await bucket.fetchResults()
  console.log("Fetch complete!", {imageCount: bucket.images.length})

  return bucket
}

module.exports = fetchBucket
