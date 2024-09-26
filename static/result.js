function display() {
    resultDiv = document.getElementById("result-div")
    result = sessionStorage.getItem("Result")
    result = JSON.parse(result)
    result = result.correctQuestions
    resultDiv.innerHTML = result

    let currentTrivia = localStorage.getItem("CurrentTriviaToPlay")
    let trivia = JSON.parse(localStorage.getItem(currentTrivia))

    displayResultOfQuestions(trivia)

    cleanup(trivia)
}

function displayResultOfQuestions(trivia) {
    for (let question of trivia.questions) {
        let questionState = JSON.parse(localStorage.getItem(question.statement))

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

function cleanup(trivia) {
    localStorage.removeItem("CurrentTriviaToPlay")

    for (let question of trivia.questions) {
        localStorage.removeItem(question.statement)
    }
}

display()
