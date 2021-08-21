const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//Crear el servidor de express

const app = express();

//Base de datos
dbConnection();

//Directorio Publico
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json() );

//rutas
//TODO: auth //login, renew
app.use('/api/auth', require('./routes/auth'));


//TODO: CRUD: Eventos


app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
});







