function readQuestions() {
    let questionStatement = document.getElementById("question").value
    let options = document.getElementsByClassName("option")

    let question = new Question(questionStatement)

    for (let option of options) {
        question.pushOption(option.value)
    }

    pushQuestionToTrivia(question)
}

function pushQuestionToTrivia(question) {
    let currentMovie = localStorage.getItem("currentMovie")
    let trivia = JSON.parse(localStorage.getItem(currentMovie))

    Object.setPrototypeOf(trivia, Trivia.prototype)

    trivia.pushQuestion(question)

    localStorage.setItem(currentMovie, JSON.stringify(trivia))
}

function clearInputs() {
    let inputs = document.getElementsByTagName("input");

    for (let input of inputs) {
        input.value = ""
    }
}

function Question(question) {
    this.statement = question
    this.options = new Array

    this.pushOption = function(option) {
        this.options.push(option)
    }
}

function buttonClick() {
    return new Promise(resolve => {
        function clicked() {
            document.getElementById("submit-questions").removeEventListener("click", clicked)
            resolve("resolve")
        }
        document.getElementById("submit-questions").addEventListener("click", clicked)
    })
}

async function waitForClick() {
    let i = 0

    while (i < 5) {
        console.log("Waiting!")
        await buttonClick()
        console.log("clicked")
        readQuestions()
        clearInputs()
        i++;
    }

    localStorage.removeItem("currentMovie")
    location.href = "index.html"
}

waitForClick()
