function load() {
    body = document.getElementsByTagName("body")[0]

    galleryContainer = document.createElement("div")
    galleryContainer.setAttribute("class", "gallery-container")
    console.log(galleryContainer)

    galleryColumnOne = document.createElement("div")
    galleryColumnOne.setAttribute("class", "gallery-column")
    galleryColumnOne.setAttribute("id", "gallery-column-1")

    galleryColumnTwo = document.createElement("div")
    galleryColumnTwo.setAttribute("class", "gallery-column")
    galleryColumnTwo.setAttribute("id", "gallery-column-2")

    galleryColumnThree = document.createElement("div")
    galleryColumnThree.setAttribute("class", "gallery-column")
    galleryColumnThree.setAttribute("id", "gallery-column-3")

    galleryColumnFour = document.createElement("div")
    galleryColumnFour.setAttribute("class", "gallery-column")
    galleryColumnFour.setAttribute("id", "gallery-column-4")

    galleryContainer.appendChild(galleryColumnOne)
    galleryContainer.appendChild(galleryColumnTwo)
    galleryContainer.appendChild(galleryColumnThree)
    galleryContainer.appendChild(galleryColumnFour)
    body.appendChild(galleryContainer)
    list = localStorage.getItem("TriviaList")
    if (list) {
        list = JSON.parse(list)

        let index = 0;
        for (let triviaName of list.list) {
            index++;
            if (index > 4) {
                index = 1
            }

            let triviaData = JSON.parse(localStorage.getItem(triviaName))
            
            galleryElement = document.createElement("div")
            galleryElement.setAttribute("class", "gallery-element")

            image = document.createElement("img")
            image.setAttribute("class", "gallery-image")
            image.setAttribute("src", triviaData.bannerURL)
            image.setAttribute("alt", triviaName)
            image.setAttribute("onclick", "imageClick(this)")
            galleryElement.appendChild(image)

            galleryColumnID = "gallery-column-" + index.toString()
            galleryColumn = document.getElementById(galleryColumnID)
        
            galleryColumn.appendChild(galleryElement)
        }
    }

}

function imageClick(e) {
    localStorage.setItem("CurrentMovie", e.getAttribute("alt"))
    location.href = "trivia.html"
}

load()
