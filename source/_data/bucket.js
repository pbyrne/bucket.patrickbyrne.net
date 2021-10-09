const Airtable = require("airtable");

class BucketImage {
  #airtableRecord

  constructor(airtableRecord) {
    this.airtableRecord = airtableRecord
  }

  get name() {
    return this.airtableRecord.get("Name")
  }

  get date() {
    return new Date(this.airtableRecord.get("Date"))
  }

  get images() {
    return this.airtableRecord.get("Image")
  }

  get image() {
    // console.log({this: this, name: this.name, images: this.images})
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
  #base
  #client
  images = []
  selectOptions = {
    sort: [{field: "Name", direction: "asc"}],
    // maxRecords: 5,
  }
  tableName

  constructor({tableName, selectOptions} = {}) {
    this.client = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
    this.base = this.client.base(process.env.AIRTABLE_BUCKET_BASE_ID)
    this.tableName = tableName
    this.selectOptions = selectOptions || this.selectOptions
  }

  async fetchResults() {
    await this.base(this.tableName)
      .select(this.selectOptions)
      .eachPage((records, fetchNextPage) => {
        console.log("Fetching a page from class", {
          cumulativeCount: this.images.length,
          pageCount: records.length,
        })
        records.forEach(record => {
          // console.log({record: record, fields: record.fields})
          this.images.push(new BucketImage(record))
        })
        fetchNextPage()
      })
      .then((maybeError) => {
        if (maybeError) {
          console.log("Error fetching images", maybeError)
        }
      })

    console.log("Done fetching images!", {finalCount: this.images.length})
  }
}

fetchBucket = async function() {
  // console.log("data function start")
  bucket = new Bucket({tableName: "images"})
  // console.log("data function initialize bucket", bucket)
  await bucket.fetchResults()
  // console.log("data function fetched images", bucket.images.length)

  return bucket
}

module.exports = fetchBucket
