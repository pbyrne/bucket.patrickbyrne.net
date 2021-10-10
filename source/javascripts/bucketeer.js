export default class Bucketeer {
  filter
  images
  sorters
  defaultQueryValue

  constructor({filter, images, sorters} = {}) {
    this.filter = document.querySelector(filter)
    this.images = document.querySelectorAll(images)
    this.sorters = document.querySelectorAll(sorters)
    this.defaultQueryValue = (new URL(window.location)).searchParams.get("filter")

    // event bindings
    this.filter.addEventListener("input", this.triggerFilter.bind(this))
    this.sorters.forEach((sorter) => {
      sorter.classList.add("cursor-pointer")
      sorter.addEventListener("click", this.triggerSort.bind(this))
    })

    // on-load behavior
    this.filter.form.classList.remove("invisible")
    if (this.defaultQueryValue) {
      this.filter.value = this.defaultQueryValue
      this.filter.dispatchEvent(new Event("input")) // TODO: Understand why `.value=` doesn't trigger change event
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

  filterBy(value) {
    this.queryValueFromURL = value
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

  triggerSort(event) {
    const heading = event.target
    const currentSort = heading.dataset.sorted
    const newSort = currentSort == "asc" ? "desc" : "asc"
    const headingIndex = Array.from(heading.parentNode.children).indexOf(heading)

    this.sorters.forEach((sorter) => delete sorter.dataset.sorted)
    heading.dataset.sorted = newSort
    Array.from(this.images)
      .sort((row1, row2) => {
        // TODO use a data attibute instead of innerHTML?
        const row1Value = row1.children.innerHTML.trim().toLowerCase()
        const row2Value = row2.children[headingIndex].innerHTML.trim().toLowerCase()

        if (row1Value > row2Value) {
          return newSort === "asc" ? 1 : -1
        } else if (row1Value < row2Value) {
          return newSort === "asc" ? -1 : 1
        } else {
          return 0
        }
      }).forEach(row => row.parentNode.appendChild(row))
  }
}

