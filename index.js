const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./router');

const app = express();

// Body parser para leer los datos del formulario
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar Mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://jhonhuertamz:hlKLnNUYJTDdAqpN@ac-fpd42sg-shard-00-00.b61g9ls.mongodb.net:27017,ac-fpd42sg-shard-00-01.b61g9ls.mongodb.net:27017,ac-fpd42sg-shard-00-02.b61g9ls.mongodb.net:27017/acortadorUrl', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    authSource: 'admin',
    replicaSet: 'atlas-11j7ph-shard-0'
})
.then(() => {
    console.log("Conexión a MongoDB establecida correctamente");
})
.catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
});

// Habilitar pug
app.set('view engine', 'pug');


// Carpeta para las vistas
app.set('views', path.join(__dirname, './views'));

// Cargar los archivos estaticos en public
app.use(express.static('public'));

// Definir rutas de la aplicación
app.use('/', routes());


app.listen(3000);