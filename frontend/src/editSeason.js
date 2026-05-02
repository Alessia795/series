import axios from 'axios';
import './verifyUser.js';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
let serieId;

// Cargar datos actuales
axios.get('http://localhost:8081/temporadas/' + id)
    .then((response) => {
        const temporada = response.data;
        serieId = temporada.serie_id;
        document.getElementById('numero').value = temporada.numero_temporada;
        document.getElementById('descripcion').value = temporada.descripcion;
    });

window.editSeason = function() {
    const numero = document.getElementById('numero').value;
    const descripcion = document.getElementById('descripcion').value;

    axios.put('http://localhost:8081/temporadas/' + id, { numero, descripcion})
        .then(() => {
            window.location.href = 'season.html?id=' + serieId;
        });
}

window.cancelar = function() {
    window.location.href = 'season.html?id=' + serieId;
}