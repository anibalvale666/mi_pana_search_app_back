const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//Crear el servidor de express

const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());


//Directorio Publico
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json() );

//rutas
//TODO: auth //login, renew
app.use('/api/auth', require('./routes/auth'));
app.use('/api/data', require('./routes/data'));
app.use('/api/filterswishlist', require('./routes/filter'));
// app.use('/api/accounts', require('./routes/accounts'));


//TODO: CRUD: Eventos
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
});







