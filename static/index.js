function load() {
    body = document.getElementsByTagName("body")[0]

    galleryContainer = document.createElement("div")
    galleryContainer.setAttribute("class", "gallery-container")

    galleryColumnOne = document.createElement("div")
    galleryColumnOne.setAttribute("class", "gallery-column")

    image = document.createElement("img")
    image.setAttribute("class", "gallery-image")
    image.setAttribute("src", "https://images.unsplash.com/photo-1565252503738-0d47de5d50e8?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")

    galleryColumnOne.appendChild(image)

    image = document.createElement("img")
    image.setAttribute("class", "gallery-image")
    image.setAttribute("src", "https://images.unsplash.com/photo-1565252503738-0d47de5d50e8?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")

    galleryColumnOne.appendChild(image)

    galleryContainer.appendChild(galleryColumnOne)

    galleryColumnTwo = document.createElement("div")
    galleryColumnTwo.setAttribute("class", "gallery-container")

    image = document.createElement("img")
    image.setAttribute("class", "gallery-image")
    image.setAttribute("src", "https://images.unsplash.com/photo-1565252503738-0d47de5d50e8?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")

    galleryColumnTwo.appendChild(image)

    galleryContainer.appendChild(galleryColumnTwo)

    body.appendChild(galleryContainer)
}

load()
