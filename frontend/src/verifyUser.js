if (!sessionStorage.getItem('username')) {
    window.location.href = 'login.html'
}

export const rol = sessionStorage.getItem('rol');
export const username = sessionStorage.getItem('username');

//navbar
const nav = document.getElementById('navbar');
const navbar = document.createElement('nav');
navbar.classList.add('navbar');
navbar.innerHTML = `
<div class="navbar">
    <p class="navbar-username">${username}</p>
    <button class="navbar-boton" onclick="logout()">Logout</button>
</div>
`
nav.appendChild(navbar);

window.logout = function() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('rol');
    window.location.href = 'login.html';
}