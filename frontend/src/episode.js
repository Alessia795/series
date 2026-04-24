import axios from 'axios';

window.readEpisodes = function () {
    const params = new URLSearchParams(window.location.search);
    const serieId = params.get('serieId');
    const temporadaId = params.get('temporadaId');
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
                episodios.appendChild(tarjeta);
            });
        })
}