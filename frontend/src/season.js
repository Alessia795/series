import axios from 'axios';
import { rol, username } from './verifyUser.js';

window.readSeasons = function () {
    const params = new URLSearchParams(window.location.search);
    const serieId = params.get('id');
    axios.get('http://localhost:8081/series/' + serieId)
        .then((response) => {
            const serie = response.data;
            const anadir = document.getElementById('addSeason');

            if (rol === 'admin') {
                const botonAnadir = document.createElement('button');
                botonAnadir.classList.add('btn-anadir');
                botonAnadir.textContent = 'Añadir temporada';
                botonAnadir.onclick = () => window.location.href = 'addSeason.html?id=' + serieId;
                anadir.appendChild(botonAnadir);
            }
            document.getElementById('serie-titulo').textContent = serie.titulo;
            document.getElementById('serie-genero').textContent = serie.genero;
            document.getElementById('serie-descripcion').textContent = serie.descripcion;
            document.getElementById('serie-imagen').innerHTML = `
                <img class="card-img" src="http://localhost:8081/${serie.imagen}" alt="Imagen de la serie"></img>
            `
        })

    axios.get('http://localhost:8081/series/' + serieId + '/temporadas')
        .then((response) => {
            const temporadaList = response.data;
            const temporadas = document.getElementById('temporadas');

            temporadaList.forEach(temporada => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add("card");

                tarjeta.innerHTML = `
                    <a class="link" href="episode.html?serieId=${serieId}&temporadaId=${temporada.id}">
                        <p class="card-title">${temporada.numero_temporada}</p>
                        <p class="card-description">${temporada.descripcion}</p>
                    </a>
                `
                if (rol === 'admin') {
                    const botones = document.createElement('div');
                    botones.classList.add('card-botones');
                    botones.innerHTML = `
                    <div class="container-btn">
                        <button class="btn-editar" onclick="editarTemporada(${temporada.id})">Editar</button>
                        <button class="btn-borrar" onclick="borrarTemporada(${temporada.id})">Borrar</button>
                    </div>                        
                    `;

                    tarjeta.appendChild(botones);
                }
                temporadas.appendChild(tarjeta);
            });
        })
}

    window.borrarTemporada = function (id) {
        if (confirm('¿Seguro que quieres borrar esta temporada?')) {
            axios.delete('http://localhost:8081/temporadas/' + id)
                .then(() => {
                    window.location.reload();
                });
        }
    }

    window.editarTemporada = function (id) {
        window.location.href = 'editSeason.html?id=' + id;
    }
