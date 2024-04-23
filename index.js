const moviesHTML = document.querySelector(".movies");
const moviesInput = document.querySelector("input");
const moviesBtn = document.querySelector("#movie__search--btn");
const moviesForm = document.querySelector("#movies__form");

function filterMovies(event) {
  main(event.target.value);
}

async function fetchMovies(query, filter) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=5c140bc1&s=${query}`
    );
    const movies = await response.json();
    return movies.Search;
  } catch (error) {
    console.error("Error has occured", error);
  }
}

let searchResult = "Avengers";
function fetchUserInput(event) {
  searchResult = event.target.value;
}

moviesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  //stops it refreshing page
  moviesInput.addEventListener("input", fetchUserInput);
  moviesBtn.addEventListener("click", main);
});

async function main(value) {
  try {
    moviesHTML.classList.add("movies__loading");
    const movies = await fetchMovies(searchResult);
    moviesHTML.classList.remove("movies__loading");

    if (value === "OLD_TO_NEW") {
      moviesHTML.innerHTML = movies
        .slice(0, 8)
        .sort((a, b) => a.Year - b.Year)
        .map((movie) => movieHTML(movie))
        .join("");
    } else if (value === "NEW_TO_OLD") {
      moviesHTML.innerHTML = movies
        .slice(0, 8)
        .sort((a, b) => b.Year - a.Year)
        .map((movie) => movieHTML(movie))
        .join("");
    } else {
      moviesHTML.innerHTML = movies.slice(0, 8).map((movie) => movieHTML(movie)).join("");
    }
  } catch (error) {
    console.error("Error fetching movies, please check spelling", error);
  }
}

function showMovieDetails(imdbID) {
  console.log(imdbID)
  localStorage.setItem("id", imdbID)
  window.location.href = `${window.location.origin}/movie.html`
}

function movieHTML(movie) {
  return `<div class="movie" onclick="showMovieDetails(${movie.imdbID})">
  <figure class="movie__img--wrapper">
     <img class="movie__img" src="${movie.Poster}" alt="" />
     </figure> 
     <div class="movie__title">
         ${movie.Title}
     </div>
     <div class="movie__year">
       ${movie.Year}
     </div>
   </div>`;
}

main();
