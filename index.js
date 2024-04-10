const moviesHTML = document.querySelector(".movies");
const moviesInput = document.querySelector("input");
const moviesBtn = document.querySelector("#movie__search--btn");
const moviesForm = document.querySelector("#movies__form");

async function fetchMovies(query) {
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

let searchResult = "fast";
function fetchUserInput(event) {
  searchResult = event.target.value;
}

moviesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  //stops it refreshing page
  moviesInput.addEventListener("input", fetchUserInput);
  moviesBtn.addEventListener("click", main);
});

async function main() {
  try {
    moviesHTML.classList.add("movies__loading");
    const movies = await fetchMovies(searchResult);
    moviesHTML.classList.remove("movies__loading");
    moviesHTML.innerHTML = movies.map((movie) => movieHTML(movie)).join("");
  } catch (error) {
    console.error("Error fetching movies, please check spelling", error);
  }
}

function movieHTML(movie) {
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
   </div>`
}

main();