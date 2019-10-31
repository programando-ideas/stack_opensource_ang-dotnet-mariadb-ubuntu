var express = require('express');
var logger = require('morgan');
var helmet = require('helmet');
var cors = require('cors');
var dotenv = require('dotenv');
var mariadb = require('mariadb');

dotenv.config();

//Rutas
var consultasRouter = require('./src/routes/consultas');
var vehiculosRouter = require('./src/routes/vehiculos');

var app = express();

//Parser de datos recibidos
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(cors());
app.use(helmet());

//Definicion de rutas
app.use('/api/consultas', consultasRouter);
app.use('/api/vehiculos', vehiculosRouter);

mariadb.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
})
.then(_ => {
    console.log('La coneccion a la base de datos fue satisfactoria.')
    app.listen(3000, function() {
        console.log('El sitio de APIs inició correctamente en el puerto 3000.');
    });
})
.catch(err => {
    console.log('Ocurrió un error intentando abrir la coneccion a la base de datos.', err);
});