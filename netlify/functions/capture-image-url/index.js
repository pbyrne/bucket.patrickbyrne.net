const Airtable = require("airtable");
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
  .base(process.env.AIRTABLE_BUCKET_BASE_ID)
const tableName = "images"

async function addToBucket(event, context) {
  // console.log({event, context})
  const {name, url} = JSON.parse(event.body)
  const [today] = (new Date()).toISOString().split("T")
  let response = {
    statusCode: 400,
    body: "Response not yet defined by handler",
  }
  const payload = {
    Name: name,
    Image: [{
      url: url,
      filename: name,
    }],
    Date: today,
  }
  // console.log({name, url, today, payload})

  await base(tableName).create(payload)
    .then((record) => {
      // console.log("In the `then`", {record})
      response.statusCode = 200
      response.body = record.id
      // console.log("Updated response to", {response})
    })
    .catch((error) => {
      // console.log("In the `catch`", {error})
      response.statusCode = error.statusCode
      response.body = JSON.stringify(error)
    })

  // console.log("Responding with", {response})
  return response
}

exports.handler = addToBucket
