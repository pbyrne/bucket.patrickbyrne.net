window.performOnLoad = (callback) => {
  if (document.readyState === 'loading') {  // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', callback);
  } else {  // `DOMContentLoaded` has already fired
    callback();
  }
}

performOnLoad(() => {
  document.querySelectorAll(".isnt-js").forEach((element) => {
    element.classList.remove("isnt-js")
    element.classList.add("is-js")
  })

  window.bucketeer = new Bucketeer({
    form: ".images--filter",
    images: ".images--image",
  })
})

class Bucketeer {
  constructor({form, images} = {}) {
    this.form = document.querySelector(form)
    this.images = document.querySelectorAll(images)

    this.form.classList.remove("invisible")
    this.form.querySelector("input[data-action=filter]").addEventListener("input", this.triggerFilter.bind(this))
  }

  // "asdf" to /a.*s.*d.*f/
  fuzzyRegExp(filterString) {
    const pieces = filterString.split("")
    return new RegExp(pieces.join(".*"), "i")
  }

  triggerFilter(event) {
    const input = event.target
    const fuzzyFinder = this.fuzzyRegExp(input.value)
    this.images.forEach((image) => {
      const name = image.dataset.name

      if (name.match(fuzzyFinder)) {
        image.classList.remove("hidden")
      } else {
        image.classList.add("hidden")
      }
    })
  }
}

