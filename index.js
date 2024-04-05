let movieResult;
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  //stops the page from refreshing after entering input.
  let searchTerm = form.querySelector("input").value;

  getMovies(searchTerm);
});

async function renderMovies() {
  const movieList = document.querySelector(".movies");

  movieList.classList += " movies__loading"

  if (!movieResult) {
    movieResult = await getMovies();
  }

  movieList.classList.remove("movies__loading")

  const moviesHTML = movieResult
  .map((movie) => {
      return `<div class="movie">
<figure class="movie__img--wrapper">
   <img class="movie__img" src="${movie.Poster}" alt="" />
   </figure> 
   <div class="movie__title">
       ${movie.Title}
   </div>
   <div class="movie__year">
     ${movie.Year}
   </div>
   <div class="movie__genre">
     ${movie.Genre}
   </div>
 </div>`;
    })
    .join("");

  movieList.innerHTML = moviesHTML;
}

setTimeout(() => {
  renderMovies();
}, 1000);

async function getMovies(searchTerm) {
  const request = await fetch(
    `https://www.omdbapi.com/?apikey=5c140bc1&s=${searchTerm}`);
  const movies = await request.json();
  console.log(movies);
}
