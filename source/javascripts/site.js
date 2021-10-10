window.performOnLoad = (callback) => {
  if (document.readyState === 'loading') {  // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', callback);
  } else {  // `DOMContentLoaded` has already fired
    callback();
  }
}

performOnLoad(() => {
  window.bucketeer = new Bucketeer({
    filter: ".images--filter-input",
    images: ".images--image",
    sorters: ".images--sort-trigger",
  })
})

class Bucketeer {
  constructor({filter, images, sorters} = {}) {
    this.filter = document.querySelector(filter)
    this.images = document.querySelectorAll(images)
    this.sorters = document.querySelectorAll(sorters)

    // on-load behavior
    this.filter.form.classList.remove("invisible")

    // event bindings
    this.filter.addEventListener("input", this.triggerFilter.bind(this))
    this.sorters.forEach((sorter) => {
      sorter.classList.add("cursor-pointer")
      sorter.addEventListener("click", this.triggerSort.bind(this))
    })
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
        const row1Value = row1.children[headingIndex].innerHTML.trim().toLowerCase()
        const row2Value = row2.children[headingIndex].innerHTML.trim().toLowerCase()

        // console.log("Comparing", {row1Value, row2Value, currentSort, newSort, gte: row1Value >= row2Value, lt: row1Value < row2Value})

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

