const usuariosService = require('../services/usuariosService');

// Obtener todos los usuarios
exports.getAllUsuarios = (req, res) => {
    usuariosService.getAllUsuarios((err, usuarios) => {
      if (err) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
      } else {
        res.render('usuarios', { usuarios: usuarios });
      }
    });
};

// Obtener un usuario por su ID
exports.getUsuarioById = (req, res) => {
  const userId = req.params.id;
  usuariosService.getUsuarioById(userId, (err, usuario) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener el usuario' });
    } else {
      res.json(usuario);
    }
  });
};

// Crear un nuevo usuario
exports.createUsuario = (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  const usuario = { nombre, correo, contrasena };
  usuariosService.createUsuario(usuario, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al crear el usuario' });
    } else {
      res.send('Usuario creado exitosamente');
    }
  });
};



// Eliminar un usuario
exports.eliminarUsuario = (req, res) => {
  const userId = req.params.id;
  usuariosService.deleteUsuario(userId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    } else {
      res.send('Usuario eliminado exitosamente');
    }
  });
};

// Función para mostrar el formulario de creación de usuario
exports.mostrarFormularioCrearUsuario = (req, res) => {
  res.render('crearUsuarios');
};



exports.mostrarFormularioEditarUsuario = (req, res) => {
  const userId = req.params.id;
  usuariosService.getUsuarioById(userId, (err, usuario) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener el usuario' });
    } else {
      if (usuario) {
        console.log('Usuario encontrado:', usuario);
        res.render('editarUsuario', { usuario: usuario });
      } else {
        console.log('Usuario no encontrado');
        res.status(404).send('Usuario no encontrado');
      }
    }
  });
};

exports.actualizarUsuario = (req, res) => {
  const userId = req.params.id;
  const { nombre, correo, contrasena } = req.body;
  const usuario = { nombre, correo, contrasena };
  usuariosService.updateUsuario(userId, usuario, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    } else {
      res.redirect('/usuarios'); // Redirige de regreso a la página de usuarios
    }
  });
};



