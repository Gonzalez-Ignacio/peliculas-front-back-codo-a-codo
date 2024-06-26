const apiURL = 'http://localhost:3000';

// Manejo de películas

document.getElementById('movie-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('movie-title').value;
    const director = document.getElementById('movie-director').value;
    const year = document.getElementById('movie-year').value;
    const genre = document.getElementById('movie-genre').value;
    const image = document.getElementById('movie-image').value;

    fetch(`${apiURL}/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            director,
            year,
            genre,
            image
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('movie-form').reset();
        fetchMovies();
    });
});

function fetchMovies() {
    fetch(`${apiURL}/movies`)
        .then(response => response.json())
        .then(data => {
            const movieList = document.getElementById("movie-list");
            movieList.innerHTML = '';
            data.forEach(movie => {
                const li = document.createElement("li");
                li.innerHTML = `<strong>Película: ${movie.title} </strong> (${movie.year}) - ${movie.director}
                    <button onclick="editMovie(${movie.id})">Editar</button>
                    <button onclick="deleteMovie(${movie.id})">Eliminar</button>
                `;

                movieList.appendChild(li);
            })
        })
}

function editMovie(id) {
    fetch(`${apiURL}/movies/${id}`)
        .then(response => response.json())
        .then(movie => {
            const newTitle = prompt("Ingrese el nuevo titulo: ", movie.title) || movie.title;
            const newDirector = prompt("Ingrese el nuevo titulo: ", movie.director) || movie.director;
            const newYear = prompt("Ingrese el nuevo titulo: ", movie.year) || movie.year;
            const newGenre = prompt("Ingrese el nuevo titulo: ", movie.genre) || movie.genre;
            const newImage = prompt("Ingrese el nuevo titulo: ", movie.image) || movie.image;
        
            fetch(`${apiURL}/movies/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: newTitle,
                    director: newDirector,
                    year: newYear,
                    genre: newGenre,
                    image: newImage
                })
            })
            .then(response => response.json())
            .then(() => fetchMovies())
        })
}

function deleteMovie(id) {
    if (confirm('¿Desea eliminar esta película?')) {
        fetch(`${apiURL}/movies/${id}`, {
            method: 'DELETE'
        })
        .then(() => fetchMovies())
    }
}

fetchMovies()


// Manejo de Usuarios


document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const birthday = document.getElementById('birthday').value;
    const password = document.getElementById('password').value;

    fetch(`${apiURL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            lastname,
            email,
            birthday,
            password
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('register-form').reset();
        fetchUsers();
    });
});

function fetchUsers() {
    fetch(`${apiURL}/users`)
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById("user-list");
            userList.innerHTML = '';
            data.forEach(user => {
                const li = document.createElement("li");
                li.innerHTML = `<strong>${user.username} ${user.lastname}</strong> (${user.email})
                    <button onclick="editUser(${user.id})">Editar</button>
                    <button onclick="deleteUser(${user.id})">Eliminar</button>
                `;

                userList.appendChild(li);
            })
        })
}

function editUser(id) {
    fetch(`${apiURL}/users/${id}`)
        .then(response => response.json())
        .then(user => {
            const newUsername = prompt("Ingrese el nuevo nombre: ", user.username) || user.username;
            const newLastname = prompt("Ingrese el nuevo apellido: ", user.lastname) || user.lastname;
            const newEmail = prompt("Ingrese el nuevo email: ", user.email) || user.email;
            const newBirthday = prompt("Ingrese la nueva fecha de nacimiento: ", user.birthday) || user.birthday;
            const newPassword = prompt("Ingrese la nueva contraseña: ", user.password) || user.password;
        
            fetch(`${apiURL}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: newUsername,
                    lastname: newLastname,
                    email: newEmail,
                    birthday: newBirthday,
                    password: newPassword
                })
            })
            .then(response => response.json())
            .then(() => fetchUsers())
        })
}

function deleteUser(id) {
    if (confirm('¿Desea eliminar este usuario?')) {
        fetch(`${apiURL}/users/${id}`, {
            method: 'DELETE'
        })
        .then(() => fetchUsers())
    }
}