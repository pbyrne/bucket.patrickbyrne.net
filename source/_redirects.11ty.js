class Redirects {
  data() {
    return {
      permalink: (data) => {
        return "public/_redirects"
      },
    }
  }

  render(data) {
    console.log("Rendering _redirects")
    const redirects = []
    data.bucket.images.map((image) => {
      redirects.push(`/${image.url} ${data.filesDomain}/${image.privateUrlOriginal} 200`)
      redirects.push(`/${image.thumbnail} ${data.filesDomain}/${image.privateUrlThumbnail} 200`)
      // TODO aliases (for renaming to keep respecting the old URL)
    })

    return redirects.join("\n")
  }
}

module.exports = Redirects
