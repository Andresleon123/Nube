const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Ruta para obtener todos los usuarios
router.get('/', usuariosController.getAllUsuarios);

// Ruta para acceder al formulario de creación de nuevos usuarios
router.get('/nuevo', (req, res) => {
  console.log('Accediendo al formulario para crear un nuevo usuario');
  res.render('crearUsuarios');
});

// Ruta para acceder al formulario de edición de usuarios
router.get('/:id/editar', usuariosController.mostrarFormularioEditarUsuario);

// Ruta para crear un nuevo usuario (POST)
router.post('/nuevo', usuariosController.createUsuario);

// Ruta para actualizar un usuario (PUT)
router.put('/:id', usuariosController.actualizarUsuario);

// Cambia esta parte para usar POST para eliminar usuarios
router.post('/delete/:id', usuariosController.eliminarUsuario);

router.post('/:id/update', usuariosController.actualizarUsuario);

module.exports = router;
