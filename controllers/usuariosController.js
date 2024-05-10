const usuariosService = require('../services/usuariosService');

exports.getAllUsuarios = (req, res) => {
  usuariosService.getAllUsuarios((err, usuarios) => {
    if (err) {
      console.error('Error al obtener los usuarios:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.render('usuarios', { usuarios });
  });
};

exports.createUsuario = (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  const usuario = { nombre, correo, contrasena };
  usuariosService.createUsuario(usuario, (err, result) => {
    if (err) {
      console.error('Error al crear el usuario:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.redirect('/usuarios');
  });
};

exports.actualizarUsuario = (req, res) => {
  const userId = req.params.id;
  const { nombre, correo, contrasena } = req.body;
  console.log('Actualizando usuario:', userId, nombre, correo, contrasena); // Log de diagnóstico
  const usuario = { nombre, correo, contrasena };
  usuariosService.updateUsuario(userId, usuario, (err, result) => {
    if (err) {
      console.error('Error al actualizar el usuario:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    console.log('Usuario actualizado correctamente:', result); // Log de diagnóstico
    res.redirect('/usuarios');
  });
};
exports.updateUsuario = (id, usuario, callback) => {
  console.log('Ejecutando update para usuario:', id, usuario); // Log de diagnóstico
  db.query('UPDATE usuarios SET ? WHERE id = ?', [usuario, id], callback);
};


exports.eliminarUsuario = (req, res) => {
  const userId = req.params.id;
  console.log(`Eliminando usuario con ID: ${userId}`);
  usuariosService.deleteUsuario(userId, (err, result) => {
    if (err) {
      console.error('Error al eliminar el usuario:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.redirect('/usuarios');
  });
};

exports.mostrarFormularioEditarUsuario = (req, res) => {
  const userId = req.params.id;
  usuariosService.getUsuarioById(userId, (err, usuario) => {
    if (err) {
      console.error('Error al obtener el usuario:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    if (!usuario) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.render('editarUsuario', { usuario });
  });
};

exports.actualizarUsuario = (req, res) => {
  const userId = req.params.id;
  const { nombre, correo, contrasena } = req.body;
  
  console.log(`Actualizando usuario: ${userId}`);

  // Asegúrate de que la contraseña sea gestionada adecuadamente si es necesario
  const usuario = { nombre, correo, contrasena };

  usuariosService.updateUsuario(userId, usuario, (err, result) => {
    if (err) {
      console.error('Error al actualizar el usuario:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    console.log('Usuario actualizado correctamente:', result);
    res.redirect('/usuarios');
  });
};

