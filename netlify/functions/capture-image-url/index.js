const Bucket = require("../../lib/bucket.js")
const bucket = new Bucket()

async function addToBucket(event, context) {
  // console.log({event, context})
  const {name, url} = JSON.parse(event.body)
  const [today] = (new Date()).toISOString().split("T")
  let response = {
    statusCode: 400,
    body: "Response not yet defined by handler",
  }

  await bucket.uploadImage({name: name, url: url, date: today})
    .then((response) => {
      response.statusCode = 200
      response.body = response
    })
    .catch((error) => {
      response.statusCode = error.statusCode
      response.body = JSON.stringify(error)
    })

  return response
}

exports.handler = addToBucket
