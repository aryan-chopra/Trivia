function createOrEditTriviaData() {
    const triviaName = document.getElementById("entry-trivia-name").value
    const bannerURL = document.getElementById("entry-trivia-url").value
    let currentTrivia = localStorage.getItem("CurrentTriviaToEdit")

    if (!validInputs()) {
        console.log("Invalid URL")
        return
    }

    //Edit operation
    if (currentTrivia) {
        let trivia = localStorage.getItem(currentTrivia)
        trivia = JSON.parse(trivia)

        if (!(triviaName === currentTrivia)) {
            let triviaList = new TriviaList
            triviaList.retrieve()
            triviaList.list.delete(currentTrivia)
            triviaList.list.add(triviaName)
            triviaList.save()

            localStorage.removeItem(currentTrivia)
            localStorage.setItem(triviaName, JSON.stringify(trivia))

            currentTrivia = triviaName
        }

        trivia.bannerURL = bannerURL
        localStorage.setItem(currentTrivia, JSON.stringify(trivia))

        localStorage.setItem("CurrentTriviaToEditOrCreate", currentTrivia)
        localStorage.removeItem("CurrentTriviaToEdit")
        location.href = "question.html"
    }

    //Movie with the name already exists
    else if (triviaExists(triviaName)) {
        console.log("Already Exists")
    }

    //Create new trivia
    else {
        let trivia = new Trivia(bannerURL)
        localStorage.setItem(triviaName, JSON.stringify(trivia))

        let triviaList = new TriviaList
        triviaList.retrieve()
        triviaList.list.add(triviaName)
        triviaList.save()

        localStorage.setItem("CurrentTriviaToEditOrCreate", triviaName)
        location.href = "./question.html"
    }
}

function validInputs() {
    let triviaName = document.getElementById("entry-trivia-name").value
    let bannerURL = document.getElementById("entry-trivia-url").value

    if (triviaName.length == 0) {
        let requiredIndicator = document.getElementById("entry-name-indicator")
        requiredIndicator.style.display = "block"
        document.getElementById("entry-trivia-name").addEventListener("input", hideIndicator)
        console.log(document.getElementById("entry-trivia-name"))

        return false
    }

    let url
    try {
        url = new URL(bannerURL)
    } catch (_) {
        let requiredIndicator = document.getElementById("entry-url-indicator")
        requiredIndicator.style.display = "block"
        document.getElementById("entry-trivia-url").addEventListener("input", hideIndicator)
        console.log(document.getElementById("entry-trivia-name"))

        return false
    }

    return true
}

function triviaExists(triviaName) {
    let triviaList = new TriviaList

    if (triviaList.retrieve()) {
        console.log("retrieved")
        return triviaList.list.has(triviaName)
    }
    else {
        console.log("saving")
        triviaList.save()
        return false
    }
}

function deleteEntry() {
    let currentTrivia = localStorage.getItem("CurrentTriviaToEdit")
    localStorage.removeItem(currentTrivia)

    let triviaList = new TriviaList
    triviaList.retrieve()
    triviaList.list.delete(currentTrivia)
    triviaList.save()

    localStorage.removeItem("CurrentTriviaToEdit")

    location.href = "./../index.html"
}

function loadData() {
    console.log("loading...")
    localStorage.removeItem("CurrentTriviaToEdit")
    localStorage.removeItem("CurrentTriviaToEditOrCreate")
    currentTrivia = localStorage.getItem("CurrentTrivia")

    if (currentTrivia) {
        console.log("Exists")
        trivia = localStorage.getItem(currentTrivia)
        trivia = JSON.parse(trivia)

        triviaName = document.getElementById("entry-trivia-name")
        triviaURL = document.getElementById("entry-trivia-url")

        triviaName.value = currentTrivia
        triviaURL.value = trivia.bannerURL

        localStorage.setItem("CurrentTriviaToEdit", currentTrivia)
        localStorage.removeItem("CurrentTrivia")

        let leftArrow = document.getElementsByClassName("arrow-div")[0]

        let deleteIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>'

        let deleteButton = document.createElement("div")
        deleteButton.setAttribute("class", "arrow-div clickable-div-button")
        deleteButton.setAttribute("onclick", "deleteEntry()")
        deleteButton.innerHTML = deleteIcon

        leftArrow.insertAdjacentElement('afterend', deleteButton)
    }
    else {
        console.log("No movie found")
    }
}

function hideIndicator() {
    let requiredIndicator = this.nextElementSibling
    requiredIndicator.style.display = "none"
    this.removeEventListener("input", hideIndicator)
}

loadData()
