function createTriviaData() {
    const triviaName = document.getElementById("trivia-name").value
    const bannerURL = document.getElementById("banner-url").value

    let trivia = new Trivia(bannerURL)

    localStorage.setItem(triviaName, JSON.stringify(trivia))

    let list = localStorage.getItem("TriviaList")
    if (list) {
        list = JSON.parse(list)
        Object.setPrototypeOf(list, TriviaList.prototype)
        console.log("Found")
        console.log(list.prototype)
    }
    else {
        console.log("Not found")
        list = new TriviaList
    }
    console.log(list.prototype)
    list.pushTrivia(triviaName)
    localStorage.setItem("TriviaList", JSON.stringify(list))

    localStorage.setItem("currentMovie", triviaName)

    location.href = "question.html"
}

function Trivia(bannerURL) {
    this.bannerURL = bannerURL
    this.questions = new Array
}

function TriviaList() {
    this.list = new Array()
}

TriviaList.prototype.pushTrivia = function (triviaName) {
    this.list.push(triviaName)
}

Trivia.prototype.pushQuestion = function (question) {
    this.questions.push(question)
}
