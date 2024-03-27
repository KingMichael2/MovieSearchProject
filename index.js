const movieListEl = document.querySelector(".movies");


async function main(searchTerm) {
  var searchTerm = document.querySelector(".nav__search").value;

    const movies = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=5c140bc1&`);
    const moviesData = await movies.json();
    movieListEl.innerHTML = [moviesData].map((movie) => movieHTML(movie)).join("");
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