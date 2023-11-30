class BucketJSON {
  data() {
    return {
      permalink: (data) => {
        return "public/images.json"
      },
    }
  }

  render(data) {
    console.log("Rendering images.json…", {data})
    const imageArray = data.bucket.images.map((image) => {
      return {
        name: image.name,
        url: `${data.deployDomain}/${image.url}`,
        thumbnail: `${data.deployDomain}/${image.thumbnail}`,
      }
    })
    return JSON.stringify(imageArray)
  }
}

module.exports = BucketJSON
