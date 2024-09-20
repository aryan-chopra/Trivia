function load() {
    currentMovie = localStorage.getItem("CurrentTriviaTemp")
    trivia = localStorage.getItem(currentMovie)

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
    questionBox.appendChild(statement)

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
        questionBox.appendChild(label)

        optionIndex++
    }

    submitButton = document.createElement("button")
    submitButton.setAttribute("id", "trivia-submit-button")
    submitButton.innerHTML = "Submit"
    questionBox.appendChild(submitButton)
}

function displayQuestion(question) {
    statement = document.getElementById("trivia-question-statement")
    statement.innerHTML = question.statement

    optionIndex = 0
    for (let option of question.options) {
        optionButton = document.getElementById("trivia-option-" + optionIndex)
        optionButton.checked = false

        label = document.getElementById("trivia-option-label-" + optionIndex)
        label.innerHTML = option;

        label.appendChild(optionButton)
        console.log(optionButton)
        console.log("hi")

        optionIndex++
    }
}

function buttonClick() {
    return new Promise(res => {
        function clicked() {
            button = document.getElementById("trivia-submit-button").removeEventListener("click", clicked)
            res()
        }
        document.getElementById("trivia-submit-button").addEventListener("click", clicked)
    })
}

async function extractAndLoadQuestions(trivia) {
    let currentQuestion = 0

    let result = {
        correctQuestions: 0
    }

    while (currentQuestion < 5) {
        question = trivia.questions[currentQuestion]
        displayQuestion(question)

        await buttonClick()
        console.log("clicked")

        if (document.getElementById("trivia-option-0").checked) {
            result.correctQuestions++;
        }

        currentQuestion++;
    }

    sessionStorage.setItem("Result", JSON.stringify(result))

    location.href = "./result.html"
}

load()
