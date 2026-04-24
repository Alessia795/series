import axios from 'axios';

window.readSeasons = function () {
    const params = new URLSearchParams(window.location.search);
    const serieId = params.get('id');
    axios.get('http://localhost:8081/series/' + serieId)
        .then((response) => {
            const serie = response.data;
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
                temporadas.appendChild(tarjeta);
            });
        })
}