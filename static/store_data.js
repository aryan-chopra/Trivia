function doSomething() {
    const movieName = document.getElementById("movie-name").value
    const movieBannerURL = document.getElementById("movie-banner-url").value
    console.log(movieName)
    console.log(movieBannerURL)

    let movieData = localStorage.getItem(movieName)
    if (!movieData) {
        console.log("Data does not exist for the movie")
    }

    location.href = "question.html"
}