function Trivia(bannerURL) {
    this.bannerURL = bannerURL
    this.questions = new Array(5)
    this.totalQuestions = 0
}

Trivia.prototype.pushQuestion = function(question, questionIndex) {
    if (this.totalQuestions == questionIndex) {
        this.totalQuestions++
    }
    this.questions[questionIndex] = question
}

function TriviaList() {
    this.list = new Set
}

TriviaList.prototype.save = function () {
    setArray = Array.from(this.list)
    this.list = setArray
    localStorage.setItem("TriviaList", JSON.stringify(this))
}

TriviaList.prototype.retrieve = function () {
    setObject = localStorage.getItem("TriviaList")
    if (setObject) {
        setObject = JSON.parse(setObject)
        this.list = new Set(setObject.list)
        return true
    }
    else {
        return false
    }
}