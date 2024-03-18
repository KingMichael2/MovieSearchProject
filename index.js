// https://www.omdbapi.com/?i=tt3896198&apikey=5c140bc1&
const movieListEl = document.querySelector(".movie-list");

async function main() {
    const movies = await fetch("https://www.omdbapi.com/?i=tt3896198&apikey=5c140bc1&");
    const moviesData = await movies.json();
    movieListEl.innerHTML = moviesData.map((movie) => movieHTML(movie)).join("");
}

main();


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
       <div class="movie__genre">
         ${movie.Genre}
       </div>
     </div>`
}