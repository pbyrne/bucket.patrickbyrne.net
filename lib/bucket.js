const EleventyFetch = require("@11ty/eleventy-fetch");
const fetch = require("node-fetch") // TODO replace with native fetch in Node 18+
const BucketImage = require("./bucket-image.js")

module.exports = class Bucket {
  #apiKey
  #baseId
  images = []
  sortOptions = [{field: "Name", direction: "asc"}]
  tableName = "images"

  constructor({tableName, sortOptions} = {}) {
    this.apiKey = process.env.AIRTABLE_API_KEY
    this.baseId = process.env.AIRTABLE_BUCKET_BASE_ID
    this.tableName = tableName || this.tableName
    this.sortOptions = sortOptions || this.sortOptions
  }

  get baseUrl() {
    return `https://api.airtable.com/v0/${this.baseId}/${this.tableName}`
  }

  get authHeaders() {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
    }
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
        headers: this.authHeaders,
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

  async uploadImage({name, url, date} = {}) {
    const imageData = {
      Name: name,
      Image: [{
        url: url,
        filename: name,
      }],
      Date: date,
    }
    const payload = {
      records: [
        {fields: imageData},
      ],
    }
    console.log({payload})
    console.log({body: JSON.stringify(payload)})

    return fetch(this.baseUrl, {
      method: "POST",
      headers: this.authHeaders,
      body: JSON.stringify(payload),
    })
  }
}
