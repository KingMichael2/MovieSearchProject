const movieDetailsEl = document.querySelector(".movie__details");
const imdbID = localStorage.getItem("id");

async function renderDetails(imdbID) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=5c140bc1&i=${imdbID}`
    );
    const movieInfo = await response.json();
    console.log(movieInfo);
    movieDetailsEl.innerHTML = [movieInfo]
      .map((movie) => movieInfoHTML(movie))
      .join("");
    // return movieInfo.Search;
  } catch (error) {
    console.log("Error has occured", error);
  }
}

function movieInfoHTML(movie) {
  return `<div class="movie__wrapper">
              <figure class="movie__img--wrapper">
              <img class="movie__details--img" src="${movie.Poster}" alt="" />
              </figure>
                <div class="movie__details--title">
                ${movie.Title}
                </div>
                <p class="movie__info">
                <span class="movie__info--anchor">Runtime:</span> ${movie.Runtime}
                </p>
                <p class="movie__info">
                <span class="movie__info--anchor">PG Rating:</span> ${movie.Rated}
                </p>
                <p class="movie__info">
                <span class="movie__info--anchor">Release Date:</span> ${movie.Released}
                </p>
                <p class="movie__info">
                <span class="movie__info--anchor">Genre:</span> ${movie.Genre}
                </p>
                <p class="movie__info">
                <span class="movie__info--anchor">Directed by:</span> ${movie.Director}
                </p>
                <p class="movie__info">
                <span class="movie__info--anchor">Staring:</span> ${movie.Actors}
                </p>
                <p class="movie__info">
                <span class="movie__info--anchor">Plot:</span> ${movie.Plot}
                </p>
            </div>`;
}

renderDetails(imdbID);
