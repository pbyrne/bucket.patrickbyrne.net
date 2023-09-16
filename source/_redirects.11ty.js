class Redirects {
  data() {
    return {
      permalink: (data) => {
        return "_redirects"
      },
    }
  }

  render(data) {
    console.log("Rendering _redirects")
    const redirects = []
    data.bucket.images.map((image) => {
      redirects.push(`/${image.original.url} ${data.filesDomain}/${image.original.source} 200`)
      redirects.push(`/${image.still.url} ${data.filesDomain}/${image.still.source} 200`)
      redirects.push(`/${image.thumbnail.url} ${data.filesDomain}/${image.thumbnail.source} 200`)
      // TODO aliases (for renaming to keep respecting the old URL)
    })

    return redirects.join("\n")
  }
}

module.exports = Redirects
