function load(columns) {
    console.log("Loading....")

    let galleryColumns = createGalleryColumns(columns)

    list = localStorage.getItem("TriviaList")
    if (list) {
        list = JSON.parse(list)

        let index = 0;
        for (let triviaName of list.list) {
            if (index == galleryColumns.length) {
                index = 0
            }

            let triviaData = JSON.parse(localStorage.getItem(triviaName))

            galleryElement = document.createElement("div")
            galleryElement.setAttribute("class", "gallery-element")

            editButtonDiv = document.createElement("div")
            editButtonDiv.setAttribute("class", "edit-trivia-button-div clickable-div-button")
            editButtonDiv.setAttribute("name", triviaName)
            editButtonDiv.setAttribute("onclick", "editButtonClick(this)")

            editButton = document.createElement("img")
            editButton.setAttribute("class", "edit-trivia-button")
            editButton.setAttribute("src", "./static/icons/edit-icon.svg")

            editButtonDiv.appendChild(editButton)
            galleryElement.appendChild(editButtonDiv)

            image = document.createElement("img")
            image.setAttribute("class", "gallery-image")
            image.setAttribute("src", triviaData.bannerURL)
            image.setAttribute("alt", triviaName)
            image.setAttribute("onclick", "imageClick(this)")
            galleryElement.appendChild(image)

            galleryColumn = galleryColumns[index]

            galleryColumn.appendChild(galleryElement)

            index++
        }
    }

}

function createGalleryColumns(columns) {
    let galleryContainer = document.getElementsByClassName("gallery-container")[0]
    
    galleryContainer.innerHTML = ""
    
    let galleryColumns = new Array()
    for (let column = 1; column <= columns; column++) {
        let galleryColumn = document.createElement("div")
        galleryColumn.setAttribute("class", "gallery-column")
        galleryColumn.setAttribute("id", "gallery-column-" + toString(column))

        galleryContainer.appendChild(galleryColumn)
        galleryColumns.push(galleryColumn)
    }

    let body = document.getElementsByTagName("body")[0]
    body.appendChild(galleryContainer)

    return galleryColumns
}

function imageClick(e) {
    localStorage.setItem("CurrentTrivia", e.getAttribute("alt"))
    location.href = "./static/trivia.html"
}

function editButtonClick(e) {
    localStorage.setItem("CurrentTrivia", e.getAttribute("name"))
    location.href = "./static/new_entry.html"
}

function addNewTrivia() {
    location.href = "./static/new_entry.html"
}

function loadGallery() {
    if (window.screen.width <= 425) {
        load(2)
    }
    else if (window.screen.width <= 768) {
        load(3)
    }
    else {
        load(4)
    }
}

function reload() {
   loadGallery() 
}

window,onresize = reload

loadGallery()
