const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.getAllUsuarios);
router.get('/:id', usuariosController.getUsuarioById);
router.post('/', usuariosController.createUsuario);

router.delete('/:id', usuariosController.eliminarUsuario);
router.post('/:id', usuariosController.actualizarUsuario);

module.exports = router;

