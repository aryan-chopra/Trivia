function Question(question) {
    this.statement = question
    this.options = new Array

    this.pushOption = function(option) {
        this.options.push(option)
    }
}

function readQuestion(questionNumber) {
    let questionStatement = document.getElementById("question").value
    let options = document.getElementsByClassName("option")

    let question = new Question(questionStatement)

    for (let option of options) {
        console.log("Option " + option.value)
        question.pushOption(option.value)
    }

    pushQuestionToTrivia(question, questionNumber)
}

function pushQuestionToTrivia(question, questionNumber) {
    let currentMovie = localStorage.getItem("CurrentTriviaTemp")
    let trivia = JSON.parse(localStorage.getItem(currentMovie))
    Object.setPrototypeOf(trivia, Trivia.prototype)
    trivia.pushQuestion(question, questionNumber)

    localStorage.setItem(currentMovie, JSON.stringify(trivia))
}

function clearInputs() {
    let inputs = document.getElementsByTagName("input");

    for (let input of inputs) {
        input.value = ""
    }
}

function buttonClick() {
    return new Promise(resolve => {
        function clicked() {
            document.getElementById("submit-questions").removeEventListener("click", clicked)
            resolve()
        }
        document.getElementById("submit-questions").addEventListener("click", clicked)
    })
}

async function waitForClick() {
    let questionNumber = 0

    while (questionNumber < 5) {
        loadQuestionAndOptions(questionNumber)
        await buttonClick()
        readQuestion(questionNumber)
        clearInputs()
        questionNumber++;
    }

    localStorage.removeItem("CurrentTriviaTemp")
    location.href = "./../index.html"
}

function loadQuestionAndOptions(questionNumber) {
    let currentTrivia = localStorage.getItem("CurrentTriviaTemp")

    let trivia = localStorage.getItem(currentTrivia)
    trivia = JSON.parse(trivia)

    //Is valid index
    if (trivia.totalQuestions > questionNumber) {
        statement = document.getElementById("question")
        statement.value = trivia.questions[questionNumber].statement

        let options = document.getElementsByClassName("option")

        let optionIndex = 0
        for (let option of trivia.questions[questionNumber].options) {
            options[optionIndex].value = option
            optionIndex++
        }
    }

    else {
        console.log("Invalid index: " + questionNumber + " for " + trivia.totalQuestions)
    }
}

waitForClick()
