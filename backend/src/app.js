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

//obtener todas las series
app.get('/series/', async (req, res) => {
    const series = await database('series').select('*');
    res.status(200).json(series);
})

//obtener las series por id
app.get('/series/:id', async (req, res) => {
    const series = await database('series').where('id', req.params.id).first();
    res.status(200).json(series);
})

//obtener las temporadas por id de la serie
app.get('/series/:id/temporadas', async (req, res) => {
    const temporadas = await database('temporadas').where('serie_id', req.params.id).select('*');
    res.status(200).json(temporadas);
})

//obtener las temporadas por id
app.get('/temporadas/:id', async (req, res) => {
    const temporada = await database('temporadas').where('id', req.params.id).first();
    res.status(200).json(temporada);
})

//obtener los episodios por id
app.get('/temporadas/:id/episodios/', async (req, res) => {
    const episodios = await database('episodios').where('temporada_id', req.params.id).select('*');
    res.status(200).json(episodios);
})

//añadir una nueva serie
app.post('/series', async (req, res) => {
    await database('series').insert({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        genero: req.body.genero,
        imagen: req.body.imagen
    })
    res.status(201).json({});
})

//añadir una nueva temporada
app.post('/temporadas', async (req, res) => {
    await database('temporadas').insert({
        numero_temporada: req.body.numero_temporada,
        descripcion: req.body.descripcion
    })
    res.status(201).json({});
})

//añadir un nuevo episodio
app.post('/episodios', async (req, res) => {
    await database('episodios').insert({
        numero_episodio: req.body.numero_episodio,
        titulo: req.body.titulo,
        duracion_min: req.body.duracion_min,
        descripcion: req.body.descripcion
    })
    res.status(201).json({});
})

//modificar una serie
app.put('/series/:id', async (req, res) => {
    const id = req.params.id;
    await database('series').where('id', id).update({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        genero: req.body.genero,
        imagen: req.body.imagen
    })
    res.status(200).json({});
})

//modificar una temporada
app.put('/temporadas/:id', async (req, res) => {
    const id = req.params.id;
    await database('temporadas').where('id', id).update({
        numero_temporada: req.body.numero_temporada,
        descripcion: req.body.descripcion
    })
    res.status(200).json({});
})

//modificar un episodio
app.put('/episodios/:id', async (req, res) => {
    const id = req.params.id;
    await database('episodios').where('id', id).update({
        numero_episodio: req.body.numero_episodio,
        titulo: req.body.titulo,
        duracion_min: req.body.duracion_min,
        descripcion: req.body.descripcion
    })
    res.status(200).json({});
})

//borrar una serie. Hay que tener en cuenta las relaciones
app.delete('/series/:id', async (req,res) => {
    const id = req.params.id;

    //averiguo cuantas temporadas tiene la serie
    const temporadas = await database('temporadas').select('id').where('serie_id', id);

    //inserto la información en un array
    const temporadas_id = [];
    for (let i of temporadas) {
        temporadas_id.push(i.id)
    }

    //borro los episodios
    for (let i of temporadas_id) {
        await database('episodios').where('temporada_id', temporadas_id).delete();
    }

    //borro las temporadas
    await database('temporadas').where('serie_id', id).delete();

    //borro la serie
    await database('series').where('id', id).delete();

    res.json({});
})

//borrar una temporada. Teniendo en cuenta las relaciones tengo que borrar primero los episodios
app.delete('/temporadas/:id', async (req, res) => {
    const id = req.params.id;

    await database('episodios').where('temporada_id', id).delete();
    await database('temporadas').where('id', id).delete();

    res.json({});
})

//borrar un episodio
app.delete('/episodios/:id', async (req, res) => {
    const id = req.params.id;

    await database('episodios').where('temporadas_id', temporadas_id).delete();

    res.json({});
})

//Listener 
app.listen(8081, () => {
    console.log('El backend ha iniciado en el puerto 8081')
})

