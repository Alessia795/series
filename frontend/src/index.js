import axios from 'axios';

window.readSeries = function() {
    axios.get('http://localhost:8081/series') 
        .then((response) => {
            const seriesList = response.data;
            const seriesID = document.getElementById('series');

        })
}