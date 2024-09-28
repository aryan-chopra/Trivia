function Question(question) {
    this.statement = question
    this.options = new Array

    this.pushOption = function (option) {
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
    let currentMovie = localStorage.getItem("CurrentTriviaToEditOrCreate")
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
        function next() {
            document.getElementById("submit-questions").removeEventListener("click", next)
            resolve(1)
        }

        function previous() {
            document.getElementById("show-previous-fields").removeEventListener("click", previous)
            resolve(-1)
        }
        document.getElementById("submit-questions").addEventListener("click", next)
        document.getElementById("show-previous-fields").addEventListener("click", previous)
    })
}

function validInputs() {
    let inputs = document.getElementsByTagName("input")

    for (let input of inputs) {
        if (input.value.length == 0) {
            let requiredIndicator = input.nextElementSibling
            requiredIndicator.style.display = "block"

            input.addEventListener("input", hideIndicator)

            return false
        }
    }
    return true
}

async function waitForClick() {
    let questionNumber = 0

    let loadOptions = true
    while (questionNumber < 5) {
        if (loadOptions) {
            loadQuestionAndOptions(questionNumber)
        }
        loadOptions = true
        await buttonClick().then((value) => {
            if (value == -1) {
                if (questionNumber == 0) {
                    localStorage.setItem("CurrentTrivia", localStorage.getItem("CurrentTriviaToEditOrCreate"))
                    localStorage.removeItem("CurrentTriviaToEditOrCreate")
                    location.href = './new_entry.html'
                }

                questionNumber--
            }

            if (value == 1) {
                if (validInputs()) {
                    readQuestion(questionNumber)
                    clearInputs()
                    questionNumber++
                }
                else {
                    loadOptions = false
                }
            }
        })
    }

    localStorage.removeItem("CurrentTriviaEditOrCreate")
    location.href = "./../index.html"
}

function loadQuestionAndOptions(questionNumber) {
    let currentTrivia = localStorage.getItem("CurrentTriviaToEditOrCreate")

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

function hideIndicator() {
    let requiredIndicator = this.nextElementSibling
    requiredIndicator.style.display = "none"
    this.removeEventListener("input", hideIndicator)
}

waitForClick()
