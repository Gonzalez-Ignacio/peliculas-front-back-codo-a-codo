// 1- Importamos express
const express = require("express");
// 2- Instanciar Router de express
const router = express.Router();
// 3- Importar modulo de lectura fs
//File System: Get, Post, Put, Delete
const fs = require("fs");
// 4- Importar modulo path
//Normaliza las Rutas y Leer el archivo en una ruta relativa especifica
const path = require("path");
// 5- Utilización de path.join
//'.join' une la ruta actual con la ruta de los JSON
//__dirname es una variable global de node que contiene la ruta actual. Ej: C:\Users\...
const moviesPath = path.join(__dirname, "../public/movies.json");
// 6- Leemos y formateamos el archivo JSON
//readFileSync: Leer archivo de forma Sincrónica
const archivoJson = fs.readFileSync(moviesPath, "utf8");
// 7- Convertimos JSON a Array Legible por JS
// JSON.parse convierte un string JSON en un objeto JS
const movies = JSON.parse(archivoJson);
// 8- Definición de las Solicitudes
// 8.1- Prueba con solicitud GET /movies/saludo

router.get("/saludo", (req, res) => {
    res.json({
        message: "Hola mundo"
    });
})

// 8.2- Obtenemos el listado completo
router.get("/list", (req, res) => {
    //movies contiene todo el movies.json... (ID, title, director, year, image)
    res.json(movies);
})

// 8.3- Rutas paramétricas con id
router.get("/:id", (req, res) => {
    const movie = movies.find(movie => movie.id === parseInt(req.params.id));   //preguntar req.params.id
    //Si no se encuentra la película...
    if(!movie) {
        // Variable estado 404
        const estado404 = res.statusCode(404);
        //Valor de retorno
        return estado404.send("Película no encontrada");
    }
    //Enviamos la película encontrada
    res.json(movie);
});

//CLASE 29
// 9- Solicitud tipo POST
// Se utiliza para crear un nuevo recurso en el servicio
// En este caso recibimos una solicitud dentro del req

router.post("/", (req, res) => {
    //Creamos un objeto con los datos que vienen en el cuerpo de la solicitud
    const nuevaPeli = {
        //Asignamos un ID cada vez que se activa el metodo post
        id: movies.length + 1,
        //El Titulo viene del cuerpo de la solicitud req.body
        title: req.body.title,
        //El Director viene del cuerpo de la solicitud req.body
        director: req.body.director,
        //El Año viene del cuerpo de la solicitud req.body
        year: req.body.year,
        //La Imagen viene del cuerpo de la solicitud req.body
        image: req.body.image
    }
    // Agregamos la nueva película al array movies
    movies.push(nuevaPeli)
    // Convertimos el array movies a un string JSON
    const moviesActualizado = JSON.stringify(movies, null, 2)   
    //Se le pasa los datos: Objeto(movies), una funcion(null) y sangría(2)
    // stringify convierte un objeto o valor de JS en una cadena de texto JSON

    // Guardamos el array en movies.json
    // cargamos el directorio, el archivo actualizado
    // y el formato de codificación de estructura
    fs.writeFileSync(moviesPath, moviesActualizado, 'utf-8');
    //Directorio, cargar el archivo actualizado y formato utf-8

    // Enviamos la respuesta del cliente de éxito en la operación
    res.status(201).json({
        message: "Pelicula agregada correctamente",
        pelicula: nuevaPeli
    })
})

// Actualizar datos mediante el metodo PUT
// 10- Solicitud PUT
// Una solicitud PUT se utiliza para actualizar un
// recurso en el servidor.
// buscamos la Peli con el id actualizado
router.put("/:id", (req, res) => {
    const peliActualizada = movies.find(peli => peli.id === parseInt(req.params.id));
    if(!peliActualizada) {
        // Variable estado 404
        const estado404 = res.status(404);
        // Valor de retorno
        return estado404.send("Pelicula no encontrada");
    }
    
    // Proceso de modificación
    // Actualizamos los datos de la pelicula
    // tengamos en cuenta que es un objeto plt para tener acceso a sus propiedades
    // y para modificarlas debemos nombrarlas co nel nombre de la propiedad
    // y asignarle el valor que viene en el cuerpo de la solicitud req.body
    // -----
    // Si no viene un valor en el cuerpo de la solicitud, se mantiene el valor actual
    // de la propiedad por si viene un valor en blanco o nulo
    // -----
    // A peliActualizada se le asigna el valor de title o el valor actual de title
    peliActualizada.title = req.body.title || peliActualizada.title
    // A peliActualizada se le asigna el valor de director o el valor actual de director
    peliActualizada.director = req.body.director || peliActualizada.director
    peliActualizada.year = req.body.year || peliActualizada.year
    peliActualizada.image = req.body.image || peliActualizada.image

    //Actualizar el archivo JSON

    // Convertimos el array movies a un string JSON
    const moviesActualizado = JSON.stringify(movies, null, 2)   
    // Guardamos el archivo actualizado
    fs.writeFileSync(moviesPath, moviesActualizado, 'utf-8');
    // Enviamos la respuesta del cliente
    res.json({
        message: "Pelicula actualizada correctamente",
        Pelicula: peliActualizada
    })

})

// 11- Solicitud Delete
// Una solicitud DELETE se utiliza para eliminar un recurso en el servidor.
// 2 parámetros, la URL y el callback
router.delete("/:id", (req, res) => {
    // Buscamos la pelicula por ID dentro del array movies
    // y almacenarla en la variable movie para después eliminarla
    // mediante el metodo DELETE
    const peliEliminada = movies.find(peli => peli.id === parseInt(req.params.id));
    if(!peliEliminada) {
        const error404 = res.status(404);
        return error404.send("Pelicula no encontrada");
    }
    
    // Eliminar la pelicula del array
    const peliIndex = movies.indexOf(peliEliminada);
    movies.splice(peliIndex, 1);

    // Actualizamos el archivo JSON
    // Convertimos el array a string JSON
    const moviesActualizado = JSON.stringify(movies, null, 2);
    // Guardamos el archivo actualizado
    fs.writeFileSync(moviesPath, moviesActualizado, 'utf-8');
    // Enviamos la respuesta al cliente
   res.json({
       message: "Pelicula eliminada correctamente",
       Pelicula: peliEliminada
   })
})



// Exportamos por modulo
module.exports = router;