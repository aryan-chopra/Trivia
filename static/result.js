function display() {
    resultDiv = document.getElementById("result-div")
    result = sessionStorage.getItem("Result")
    result = JSON.parse(result)
    result = result.correctQuestions
    resultDiv.innerHTML = result

    let currentTrivia = localStorage.getItem("CurrentTriviaToPlay")
    let trivia = JSON.parse(localStorage.getItem(currentTrivia))

    displayResultOfQuestions(trivia, currentTrivia)

    cleanup(trivia, currentTrivia)
}

function displayResultOfQuestions(trivia, currentTrivia) {
    for (let question of trivia.questions) {
        let questionState = JSON.parse(sessionStorage.getItem(currentTrivia + ", " + question.statement))

        let isCorrect = document.createElement("p")
        isCorrect.innerHTML = questionState.options[questionState.selectedOptionIndex]

        if (questionState.selectedOptionIndex == questionState.correctOptionIndex) {
            isCorrect.style.color = "green"
        }

        else {
            isCorrect.style.color = "red"
        }

        let resultDiv = document.getElementById("result-div")
        resultDiv.appendChild(isCorrect)
    }
}

function cleanup(trivia, currentTrivia) {
    localStorage.removeItem("CurrentTriviaToPlay")

    for (let question of trivia.questions) {
        sessionStorage.removeItem(currentTrivia + ", " + question.statement)
    }
}

display()
