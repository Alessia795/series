import axios from 'axios';

window.readSeries = function() {
    axios.get('http://localhost:8081/series') 
        .then((response) => {
            const seriesList = response.data;
            const seriesID = document.getElementById('series');

            seriesList.forEach(serie => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add("card");

                tarjeta.innerHTML = `
                <div class = "card-titile">
                    <h1 class ="card-title"> ${serie.titulo}</h1>
                    <a href="season.html" >
                        <img class="card-img" src="http://localhost:8081/${serie.imagen}" alt="Imagen de la serie">
                    </a>
                    <p class="card-genre">${serie.genero}</p>
                    <p class="card-description">${serie.descripcion}</p>
                </div>
                `
                seriesID.appendChild(tarjeta);
            });
        })
}