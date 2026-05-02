import axios from 'axios';
import './verifyUser.js';

const params = new URLSearchParams(window.location.search);
const serieId = params.get('id_serie');
const temporadaId = params.get('id_temporada')

window.addEpisode = function() {
    const numero = document.getElementById('numero').value;
    const titulo = document.getElementById('titulo').value;
    const duracion = document.getElementById('duracion').value;
    const descripcion = document.getElementById('descripcion').value;

    if (!numero || !titulo || !duracion || !descripcion) {
        alert('Tienes que rellenar todos los campos');
        return;
    }

    axios.post('http://localhost:8081/episodios', { 
        temporada_id: temporadaId, 
        numero_episodio: numero, 
        titulo: titulo,
        duracion_min: duracion,
        descripcion: descripcion })
        .then(() => {
            window.location.href = 'episode.html?serieId=' + serieId + '&temporadaId=' + temporadaId;
        });
}

window.cancelar = function() {
    window.location.href = 'episode.html?serieId=' + serieId + '&temporadaId=' + temporadaId;
}