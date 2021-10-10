import performOnLoad from "./perform-on-load.js"
import Bucketeer from "./bucketeer.js"

performOnLoad(() => {
  window.bucketeer = new Bucketeer({
    filter: ".images--filter-input",
    images: ".images--image",
    sorters: ".images--sort-trigger",
  })
})

