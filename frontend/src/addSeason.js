import axios from 'axios';
import './verifyUser.js';

const params = new URLSearchParams(window.location.search);
const serieId = params.get('id');

window.addSeason = function() {
    const numero = document.getElementById('numero').value;
    const descripcion = document.getElementById('descripcion').value;

    if (!numero || !descripcion ) {
        alert('Tienes que rellenar todos los campos');
        return;
    }

    axios.post('http://localhost:8081/temporadas', { serie_id: serieId,
        numero_temporada: numero, 
        descripcion: descripcion })
        .then(() => {
            window.location.href = 'season.html?id=' + serieId;
        });
}

window.cancelar = function() {
    window.location.href = 'season.html?id=' + serieId;
}