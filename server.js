const express = require('express');
const mysql = require('mysql');
const methodOverride = require('method-override');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuración de la base de datos en un archivo externo (db.js)
const db = require('./config/db');

db.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Middlewares

app.use(cors()); // Configura CORS si es necesario para tu frontend.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Configurar el motor de vistas
app.set('view engine', 'ejs');
app.set('views', './views');

// Ruta raíz
app.get('/', (req, res) => {
  res.render('index'); // Asegúrate de tener una vista 'index.ejs' en la carpeta de vistas
});

// Rutas de Usuarios
app.use('/usuarios', require('./routes/usuarios'));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).send('Error interno del servidor');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});