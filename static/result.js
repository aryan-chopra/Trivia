function display() {
    resultDiv = document.getElementById("result-div")
    result = sessionStorage.getItem("Result")
    result = JSON.parse(result)
    result = result.correctQuestions
    resultDiv.innerHTML = result

    localStorage.removeItem("CurrentTriviaToPlay")
}

display()
