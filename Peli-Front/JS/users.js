const apiURL = "http://localhost:3000";

function fetchUsers() {
    fetch(`${apiURL}/users`)
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById("user-list");
            userList.innerHTML = ''
            data.forEach(user => {
                const li = document.createElement("li");
                li.innerHTML = `<strong>Nombre Completo: ${user.username} ${user.lastname}</strong>`;
                li.innerHTML = `<br>E-mail: ${user.email}`;
                li.innerHTML = `<br>Fecha de Nacimiento: ${user.birthday}`;

                userList.appendChild(li);
            });
        })
    
}
fetchUsers()