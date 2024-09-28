function display() {
    let result = JSON.parse(sessionStorage.getItem("Result")).correctQuestions

    console.log(result)

    document.getElementById("score").innerHTML = "You scored " + result + " / 5"

    let currentTrivia = localStorage.getItem("CurrentTriviaToPlay")
    let trivia = JSON.parse(localStorage.getItem(currentTrivia))

    createQuestionBox()

    displayResultOfQuestions(trivia, currentTrivia)
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

async function displayResultOfQuestions(trivia, currentTrivia) {
    let currentQuestion = 0
    while (currentQuestion < 5) {
        let question = trivia.questions[currentQuestion]
        let questionState = JSON.parse(sessionStorage.getItem(currentTrivia + ", " + question.statement))

        let letfArrow = document.getElementById("show-previous-question")
        if (currentQuestion == 0) {
            letfArrow.setAttribute("class", "arrow-div left-arrow clickable-div-button disabled-div-button")
        }

        else if (currentQuestion == 1) {
            letfArrow.setAttribute("class", "arrow-div left-arrow clickable-div-button")
        }

        showQuestionState(questionState, question.statement)

        await buttonClick().then((value) => {
            if (value == 1) {
                currentQuestion++
            }

            else {
                currentQuestion--
            }
        })
    }

    cleanup(trivia, currentTrivia)
    window.location.href = "./../index.html"
}

function showQuestionState(questionState, statement) {
    let questionStatement = document.getElementById("trivia-question-statement")
    questionStatement.innerHTML = statement

    console.log(questionState)

    for (let option in questionState.options) {
        let optionLabel = document.getElementById("trivia-option-label-" + option)
        console.log(optionLabel)
        console.log(questionState.options[option])
        optionLabel.innerHTML = questionState.options[option]
        optionLabel.style.color = "black"
        optionLabel.style.fontWeight = 400
        optionLabel.style.border = "0px"
    }

    if (questionState.selectedOptionIndex && questionState.selectedOptionIndex != -1) {
        console.log("selected: " + questionState.selectedOptionIndex)
        let label = document.getElementById("trivia-option-label-" + questionState.selectedOptionIndex)
        label.style.color = "red"
        label.style.fontWeight = 500
        label.style.border = "2px solid red"
    }

    else {
        let labels = document.getElementsByClassName("trivia-option-label")
        for (let label of labels) {
            label.style.color = "red"
            label.style.fontWeight = 500
            label.style.border = "2px solid red"
        }
    }

    let label = document.getElementById("trivia-option-label-" + questionState.correctOptionIndex)
    label.style.color = "green"
    label.style.fontWeight = 500
    label.style.border = "2px solid green"

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
}

function cleanup(trivia, currentTrivia) {
    console.log("cleaning....")
    localStorage.removeItem("CurrentTriviaToPlay")

    for (let question of trivia.questions) {
        sessionStorage.removeItem(currentTrivia + ", " + question.statement)
    }
}

display()
