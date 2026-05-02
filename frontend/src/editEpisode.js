import axios from 'axios';
import './verifyUser.js';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const serieId = params.get('serieId');       
const temporadaId = params.get('temporadaId');

// Cargar datos actuales
axios.get('http://localhost:8081/episodios/' + id)
    .then((response) => {
        const episodio = response.data;
        document.getElementById('numero').value = episodio.numero_episodio;
        document.getElementById('titulo').value = episodio.titulo;
        document.getElementById('duracion').value = episodio.duracion_min;
        document.getElementById('descripcion').value = episodio.descripcion;
    })

window.editEpisode = function () {
    const numero = document.getElementById('numero').value;
    const titulo = document.getElementById('titulo').value;
    const duracion = document.getElementById('duracion').value;
    const descripcion = document.getElementById('descripcion').value;

    axios.put('http://localhost:8081/episodios/' + id, {
            numero_episodio: numero,
            titulo: titulo,
            duracion_min: duracion,
            descripcion: descripcion
        })
        .then(() => {
            window.location.href = 'episode.html?serieId=' + serieId + '&temporadaId=' + temporadaId;
        });
}

window.cancelar = function () {
    window.location.href = 'episode.html?serieId=' + serieId + '&temporadaId=' + temporadaId;
}