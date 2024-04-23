const movieDetailsEl = document.querySelector('.movie__details');
const imdbID = localStorage.getItem("id");

async function renderDetails(imdbID) {
  try {
    const response = await fetch(
        `https://www.omdbapi.com/?apikey=5c140bc1&i=${imdbID}`
    );
    const movieInfo = await response.json();
    // return movieInfo.Search;
    movieDetailsEl.innerHTML = movieInfo.map((movie) => movieInfoHTML(movie)).join("");
  } catch(error) {
    console.log("Error has occured", error);
  }
}

function movieInfoHTML(movie) {
    return `<div class="movie__wrapper">
                <div class="movie__details--title">
                ${movie.Title}
                </div>
                <p class="movie__details--year">
                    ${post.Year}
                </p>
            </div>`
}

renderDetails(imdbID);
