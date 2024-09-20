function createOrEditTriviaData() {
    const triviaName = document.getElementById("entry-trivia-name").value
    const bannerURL = document.getElementById("entry-banner-url").value
    let currentTrivia = localStorage.getItem("CurrentTriviaTemp")

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

        else {
            trivia.bannerURL = bannerURL
            localStorage.setItem(currentTrivia, JSON.stringify(trivia))
        }

        localStorage.setItem("CurrentTriviaTemp", currentTrivia)
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

        localStorage.setItem("CurrentTrivia", triviaName)
    }
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
    let currentTrivia = localStorage.getItem("CurrentTriviaTemp")
    localStorage.removeItem(currentTrivia)
    
    let triviaList = new TriviaList
    triviaList.retrieve()
    triviaList.list.delete(currentTrivia)
    triviaList.save()

    location.href = "./../index.html"
}

function loadData() {
    console.log("loading...")
    currentTrivia = localStorage.getItem("CurrentTrivia")

    if (currentTrivia) {
        trivia = localStorage.getItem(currentTrivia)
        trivia = JSON.parse(trivia)

        triviaName = document.getElementById("entry-trivia-name")
        triviaURL = document.getElementById("entry-banner-url")

        triviaName.value = currentTrivia
        triviaURL.value = trivia.bannerURL

        localStorage.setItem("CurrentTriviaTemp", currentTrivia)
        localStorage.removeItem("CurrentTrivia")

        let inputFormContainer = document.getElementsByClassName("input-form-container")[0]

        let deleteButton = document.createElement("button")
        deleteButton.setAttribute("onclick", "deleteEntry()")
        deleteButton.innerHTML = "Delete"
        inputFormContainer.appendChild(deleteButton)
    }
    else {
        console.log("No movie found")
    }
}

loadData()
