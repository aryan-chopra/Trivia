function createTriviaData() {
    const triviaName = document.getElementById("trivia-name").value
    const bannerURL = document.getElementById("banner-url").value

    let trivia = new Trivia(bannerURL)

    localStorage.setItem(triviaName, JSON.stringify(trivia))

    localStorage.setItem("currentMovie", triviaName)

    location.href = "question.html"
}

function Trivia(bannerURL) {
    this.bannerURL = bannerURL
    this.questions = new Array
}

Trivia.prototype.pushQuestion = function (question) {
    this.questions.push(question)
}
