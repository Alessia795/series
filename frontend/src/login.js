import axios from 'axios';

window.login = function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    axios.post('http://localhost:8081/login', {
            username,
            password
        })
        .then((response) => {

            if (response.data.ok) {
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('rol', response.data.rol);
                window.location.href = 'index.html';
            }
        })
        .catch(() => {
            document.getElementById('error').textContent = 'Usuario o contraseña incorrectos';
        });
}