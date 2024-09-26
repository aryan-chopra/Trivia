function load() {
    currentMovie = localStorage.getItem("CurrentTrivia")
    localStorage.removeItem("CurrentTrivia")
    trivia = localStorage.getItem(currentMovie)
    localStorage.setItem("CurrentTriviaToPlay", currentMovie)

    if (trivia) {
        trivia = JSON.parse(trivia)
        createQuestionBox()
        extractAndLoadQuestions(trivia)
    }
}

function createQuestionBox() {
    questionBox = document.getElementById("question-box")

    statement = document.createElement("p")
    statement.setAttribute("id", "trivia-question-statement")
    questionBox.insertAdjacentElement('afterbegin', statement)

    optionIndex = 0
    while (optionIndex < 4) {
        label = document.createElement("label")
        label.setAttribute("for", "trivia-option-" + optionIndex)
        label.setAttribute("id", "trivia-option-label-" + optionIndex)
        label.setAttribute("class", "trivia-option-label")

        optionButton = document.createElement("input")
        optionButton.setAttribute("type", "radio")
        optionButton.setAttribute("id", "trivia-option-" + optionIndex)
        optionButton.setAttribute("class", "trivia-option-button")
        optionButton.setAttribute("name", "option")

        label.appendChild(optionButton)
        statement.insertAdjacentElement('afterend', label)

        optionIndex++
    }

    // submitButton = document.createElement("button")
    // submitButton.setAttribute("id", "trivia-submit-button")
    // submitButton.innerHTML = "Submit"
    // questionBox.appendChild(submitButton)
}

function displayQuestion(question) {
    statement = document.getElementById("trivia-question-statement")
    statement.innerHTML = question.statement

    let questionState = localStorage.getItem(question.statement)

    if (questionState) {
        return loadExistingQuestion(JSON.parse(questionState))
    }

    else {
        return createQuestionState(question)
    }
}

function loadExistingQuestion(questionState) {
    loadOptions(questionState.options)

    console.log("Getting: trivia-option-" + questionState.selectedOptionIndex)

    if (questionState.selectedButtonIndex != -1) {

        let checkedOption = document.getElementById("trivia-option-" + questionState.selectedOptionIndex)
        if (checkedOption) {
            console.log(checkedOption)
            checkedOption.checked = true
        }
    }
    return questionState
}

function loadOptions(options) {
    for (let option in options) {
        optionButton = document.getElementById("trivia-option-" + option)
        optionButton.checked = false

        label = document.getElementById("trivia-option-label-" + option)
        label.innerHTML = options[option]

        label.appendChild(optionButton)
    }
}

function createQuestionState(question) {
    let questionState = {
        options: new Array(),
        correctOptionIndex: -1,
        selectedOptionIndex: -1
    }

    let optionToSet = 0
    while (question.options.length > 0) {
        let optionIndex = Math.floor(Math.random() * question.options.length)
        let option = question.options.splice(optionIndex, 1)[0]

        questionState.options.push(option)

        if (questionState.correctOptionIndex == -1 && optionIndex == 0) {
            questionState.correctOptionIndex = optionToSet
        }

        optionToSet++
    }

    loadOptions(questionState.options)

    return questionState
}

function buttonClick() {
    return new Promise(res => {
        function next() {
            document.getElementById("trivia-submit-button").removeEventListener("click", next)
            document.getElementById("show-previous-question").removeEventListener("click", previous)

            res(1)
        }

        function previous() {
            document.getElementById("show-previous-question").removeEventListener("click", previous)
            document.getElementById("trivia-submit-button").removeEventListener("click", next)

            res(-1)
        }
        document.getElementById("trivia-submit-button").addEventListener("click", next)
        document.getElementById("show-previous-question").addEventListener("click", previous)
    })
}

function getSelectedButton() {
    let buttons = document.getElementsByName("option")

    for (let button of buttons) {
        if (button.checked) {
            return parseInt(button.id[button.id.length - 1])
        }
    }
}

async function extractAndLoadQuestions(trivia) {
    let currentQuestion = 0

    let result = {
        correctQuestions: 0
    }

    while (currentQuestion < 5) {
        let question = trivia.questions[currentQuestion]
        let questionState = displayQuestion(question)

        localStorage.setItem(question.statement, JSON.stringify(questionState))

        let letfArrow = document.getElementById("show-previous-question")
        if (currentQuestion == 0) {
            letfArrow.setAttribute("class", "arrow-div left-arrow clickable-div-button disabled-div-button")
        }

        else if (currentQuestion == 1) {
            letfArrow.setAttribute("class", "arrow-div left-arrow clickable-div-button")
        }

        await buttonClick().then((value) => {
            if (value == 1) {
                let selectedButtonIndex = getSelectedButton()
                questionState.selectedOptionIndex = selectedButtonIndex

                if (selectedButtonIndex == questionState.correctOptionIndex) {
                    result.correctQuestions++
                }

                localStorage.setItem(question.statement, JSON.stringify(questionState))
                currentQuestion++
            }

            else {
                currentQuestion--
            }
        })
    }
    sessionStorage.setItem("Result", JSON.stringify(result))

    location.href = "./result.html"
}

load()
