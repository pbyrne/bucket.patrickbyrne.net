const Bucket = require("../../lib/bucket.js")

module.exports = async function() {
  console.log("Fetch starting…")
  bucket = new Bucket()
  await bucket.fetchResults()
  console.log("Fetch complete!", {imageCount: bucket.images.length})

  return bucket
}
