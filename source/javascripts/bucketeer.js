export default class Bucketeer {
  filter
  images
  defaultQueryValue

  constructor({filter, images} = {}) {
    this.filter = document.querySelector(filter)
    this.images = document.querySelectorAll(images)
    this.defaultQueryValue = (new URL(window.location)).searchParams.get("filter")

    // event bindings
    this.filter.addEventListener("input", this.triggerFilter.bind(this))
    this.filter.form.addEventListener("submit", this.triggerSubmit.bind(this))

    // on-load behavior
    this.filter.form.classList.remove("invisible")
    this.filter.form.querySelectorAll(".images--filter-label").forEach((el) => {
      el.classList.add("hidden");
    })
    if (this.defaultQueryValue) {
      this.filter.value = this.defaultQueryValue
      this.filter.dispatchEvent(new Event("input")) // Assigning `value=` doesn't trigger this event
    }
  }

  // "asdf" to /a.*s.*d.*f/
  fuzzyRegExp(filterString) {
    const pieces = filterString.split("")
    return new RegExp(pieces.join(".*"), "i")
  }

  set queryValueFromURL(value) {
    window.history.pushState({filter: value}, document.title, `/?filter=${value}`)
  }

  triggerFilter(event) {
    this.filterBy(event.target.value)
  }

  triggerSubmit(event) {
    event.preventDefault()
    this.queryValueFromURL = this.filter.value
  }

  filterBy(value) {
    const fuzzyFinder = this.fuzzyRegExp(value)
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

