const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const usuariosController = require('./controllers/usuariosController');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

// Paso 3: Configurar la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'andresl', 
  password: '123456789.', 
  database: 'crud'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Paso 4: Configurar bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', './views');

// Respuesta para la ruta raíz
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación CRUD de usuarios!');
});

// Ruta para mostrar todos los usuarios
app.get('/usuarios', usuariosController.getAllUsuarios);
// Ruta para mostrar el formulario de creación de usuario
app.get('/usuarios/nuevo', (req, res) => {
    res.render('crearUsuarios'); // Reemplaza 'formulario_crear_usuario' con el nombre de tu vista EJS para crear usuarios
  });
app.get('/usuarios/:id/editar', usuariosController.mostrarFormularioEditarUsuario);

app.post('/usuarios/nuevo', usuariosController.createUsuario);
app.post('/usuarios/:id/eliminar', usuariosController.eliminarUsuario);
app.put('/usuarios/:id', usuariosController.actualizarUsuario);



  

// Ruta para crear un usuario
app.post('/usuario', (req, res) => {
  const { nombre, email } = req.body;
  const usuario = { nombre, email };
  const sql = 'INSERT INTO usuarios SET ?';
  db.query(sql, usuario, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Usuario creado exitosamente');
  });
});

// Paso 6: Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
