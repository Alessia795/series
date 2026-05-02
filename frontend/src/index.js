import axios from 'axios';
import {
    rol,
    username
} from './verifyUser.js';

window.readSeries = function () {
    axios.get('http://localhost:8081/series')
        .then((response) => {
            const seriesList = response.data;
            const series = document.getElementById('series');
            const anadir = document.getElementById('addSerie');

            if (rol === 'admin') {
                const botonAnadir = document.createElement('button');
                botonAnadir.classList.add('btn-anadir');
                botonAnadir.textContent = 'Añadir serie';
                botonAnadir.onclick = () => window.location.href = 'addSerie.html';
                addSerie.appendChild(botonAnadir);
            }

            seriesList.forEach(serie => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add("card");

                tarjeta.innerHTML = `
                    <h2 class ="card-title"> ${serie.titulo}</h2>
                    <a href="season.html?id=${serie.id}" >
                        <img class="card-img" src="http://localhost:8081/${serie.imagen}" alt="Imagen de la serie">
                    </a>
                    <p class="card-genre">${serie.genero}</p>
                    <p class="card-description">${serie.descripcion}</p>
                `
                if (rol === 'admin') {
                    const botones = document.createElement('div');
                    botones.classList.add('card-botones');
                    botones.innerHTML = `
                    <div class="container-btn">
                        <button class="btn-editar" onclick="editarSerie(${serie.id})">Editar</button>
                        <button class="btn-borrar" onclick="borrarSerie(${serie.id})">Borrar</button>
                    </div>                        
                    `;

                    tarjeta.appendChild(botones);
                }
                series.appendChild(tarjeta);
            });
        })

    window.borrarSerie = function (id) {
        if (confirm('¿Seguro que quieres borrar esta serie?')) {
            axios.delete('http://localhost:8081/series/' + id)
                .then(() => {
                    window.location.reload();
                });
        }
    }

    window.editarSerie = function (id) {
        window.location.href = 'editSerie.html?id=' + id;
    }
}