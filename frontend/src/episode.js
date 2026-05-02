import axios from 'axios';
import {
    rol,
    username
} from './verifyUser.js';

const params = new URLSearchParams(window.location.search);
const serieId = params.get('serieId');
const temporadaId = params.get('temporadaId');

window.readEpisodes = function () {
    axios.get('http://localhost:8081/series/' + serieId)
        .then((response) => {
            const serie = response.data;
            const anadir = document.getElementById('addEpisode');

            if (rol === 'admin') {
                const botonAnadir = document.createElement('button');
                botonAnadir.classList.add('btn-anadir');
                botonAnadir.textContent = 'Añadir episodio';
                botonAnadir.onclick = () => window.location.href = 'addEpisode.html?id_serie=' + serieId + '&id_temporada=' + temporadaId;
                anadir.appendChild(botonAnadir);
            }
            document.getElementById('serie-titulo').textContent = serie.titulo;
            document.getElementById('serie-genero').textContent = serie.genero;
            document.getElementById('serie-descripcion').textContent = serie.descripcion;
            document.getElementById('serie-imagen').innerHTML = `
                <img class="card-img" src="http://localhost:8081/${serie.imagen}" alt="Imagen de la serie"></img>
            `
        })

    axios.get('http://localhost:8081/temporadas/' + temporadaId)
        .then((response) => {
            const temporada = response.data;
            document.getElementById('temporada').textContent = 'Temporada numero: ' + temporada.numero_temporada;

        })

    axios.get('http://localhost:8081/temporadas/' + temporadaId + '/episodios/')
        .then((response) => {
            const episodioList = response.data;
            const episodios = document.getElementById('episodios');

            episodioList.forEach(episodio => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add("card");

                tarjeta.innerHTML = `
                    <p class="episodio-numero">Episodio número: ${episodio.numero_episodio}</p>
                    <div class="episodio-info">
                        <p class="episodio-titulo">${episodio.titulo}</p>
                        <p class="episodio-duracion">${episodio.duracion_min} min</p>
                        <p class="episodio-descripcion">${episodio.descripcion}</p>
                    </div>
                `
                if (rol === 'admin') {
                    const botones = document.createElement('div');
                    botones.classList.add('card-botones');
                    botones.innerHTML = `
                    <div class="container-btn">
                        <button class="btn-editar" onclick="editarEpisodio(${episodio.id})">Editar</button>
                        <button class="btn-borrar" onclick="borrarEpisodio(${episodio.id})">Borrar</button>
                    </div>                        
                    `;

                    tarjeta.appendChild(botones);
                }
                episodios.appendChild(tarjeta);
            });
        })
}

window.borrarEpisodio = function (id) {
    if (confirm('¿Seguro que quieres borrar este episodio?')) {
        axios.delete('http://localhost:8081/episodios/' + id)
            .then(() => {
                window.location.reload();
            });
    }
}

window.editarEpisodio = function (id) {
    window.location.href = 'editEpisode.html?id=' + id + '&serieId=' + serieId + '&temporadaId=' + temporadaId;
}