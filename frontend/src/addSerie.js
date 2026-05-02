import axios from 'axios';
import './verifyUser.js';

window.addSerie = function() {
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const genero = document.getElementById('genero').value;
    const imagen = document.getElementById('imagen').value;

    if (!titulo || !descripcion || !genero ) {
        alert('Tienes que rellenar todos los campos');
        return;
    }

    axios.post('http://localhost:8081/series', { titulo, descripcion, genero, imagen })
        .then(() => {
            window.location.href = 'index.html';
        });
}