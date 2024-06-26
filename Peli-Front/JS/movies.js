// const apiURL = "http://localhost:3000";

function fetchMovies() {
    fetch(`${apiURL}/movies`)
        .then(response => response.json())
        .then(data => {
            const movieList = document.getElementById("movie-list");
            movieList.innerHTML = ''
            data.forEach(movie => {
                const li = document.createElement("li");
                li.innerHTML = `<strong>Película: ${movie.title} </strong>`;
                li.innerHTML = `<br>Año: ${movie.year}`;
                li.innerHTML = `<br>Director: ${movie.director}`;
                li.innerHTML = `<br>Genero: ${movie.genre}`;
                li.innerHTML = `<br>Image: <img src="${movie.image}" alt="${movie.title}">`;

                movieList.appendChild(li);
            });
        })
    
}
fetchMovies()