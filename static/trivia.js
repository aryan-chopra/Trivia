function display() {
    questionBox = document.getElementById("question-box")
    
    currentMovie = localStorage.getItem("CurrentMovie")
    trivia = localStorage.getItem(currentMovie)

    if (trivia) {
        trivia = JSON.parse(trivia)
        para = document.createElement("p")
        para.setAttribute("id", "question")
        question = trivia.questions[0]
        para.innerHTML = question.statement
        questionBox.appendChild(para)

        console.log(question.options)
        optionIndex = -1
        for (let option of question.options) {
            optionIndex++;

            label = document.createElement("label")
            label.setAttribute("for", "option-" + optionIndex)
            label.innerHTML = option

            optionButton = document.createElement("input")
            optionButton.setAttribute("type", "radio")
            optionButton.setAttribute("id", "option-" + optionIndex)
            questionBox.appendChild(label)
            questionBox.appendChild(optionButton)
        }
    }
}

display()
