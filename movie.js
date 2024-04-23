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
                    Runtime: ${movie.Runtime}
                </p>
                <p class="movie__info">
                PG Rating: ${movie.Rated}
                </p>
                <p class="movie__info">
                Release Date: ${movie.Released}
                </p>
                <p class="movie__info">
                Genre: ${movie.Genre}
                </p>
                <p class="movie__info">
                Directed by: ${movie.Director}
                </p>
                <p class="movie__info">
                Staring: ${movie.Actors}
                </p>
                <p class="movie__info">
                Plot: ${movie.Plot}
                </p>
            </div>`;
}

renderDetails(imdbID);
