import Bucketeer from "./bucketeer.js"

document.addEventListener("DOMContentLoaded", () => {
  window.bucketeer = new Bucketeer({
    filter: ".images--filter-input",
    images: ".images--image",
  })
})
