const express = require('express');
const cors = require('cors');
const knex = require('knex');
const IMAGES_PATH = './img/';

const app = express();
app.use(cors());
app.use(express.json());

// La carpeta de las imágenes se sirve estáticamente para procesar las imagenes
app.use(express.static(IMAGES_PATH))

const database = knex({
    client: 'sqlite3',
    connection: {
        filename: 'series.db'
    }, 
    useNullAsDefault: true
});

//Listener 
app.listen(8081, () => {
    console.log('El backend ha iniciado en el puerto 8081')
})

