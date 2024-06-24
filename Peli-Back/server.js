// 1- Importar Express
const express = require("express");
// 2- Instanciar el objeto Express
const app = express();
// 3- Declarar Puerto
const PORT = 3000;
// 4- Llamar al modulo propio
const moviesRouter = require("./routes/moviesRouter");

/* 
5- Usar middleware express.json
Este middleware nos permite analizar los cuerpos 
de las solicitudes entrantes con formato JSON
se encarga de convertir el cuerpo de la solicitud 
en un objeto de Javascript accesible a través de req.body.

Son funciones a mitad de camino entre el cliente y el servidor.
están a la escucha de las solicitudes del cliente y las
procesan y depuran antes de que lleguen al servidor

Sirven para procesar un JSON
*/
// 5- Middleware ->
app.use(express.json());
// 6- definir el prefijo principal de la ruta
app.use("/movies", moviesRouter)
// 7- Inicializar al servidor
app.listen(PORT, ()=> {console.log(`Servidor escuchando en el puerto: ${PORT}`);});