function getQuestion() {
    let question = document.getElementById("question").value
    let correctOption = document.getElementById("question-correct-option").value
    let incorrectOptions = document.getElementsByClassName("wrong-option")

    let inputs = document.getElementsByTagName("input");

    for (let input of inputs) {
        input.value = ""
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
        i++;
    }

    location.href = "index.html"
}

waitForClick()
