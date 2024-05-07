const db = require('../config/db');

exports.getAllUsuarios = (callback) => {
  db.query('SELECT * FROM usuarios', callback);
};

exports.getUsuarioById = (id, callback) => {
  db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, usuarios) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      callback(err, null);
    } else {
      if (usuarios.length > 0) {
        const usuario = usuarios[0]; // Obtén el primer usuario del array
        console.log('Usuario encontrado en la base de datos:', usuario);
        callback(null, usuario); // Devuelve solo el usuario encontrado
      } else {
        console.log('Usuario no encontrado en la base de datos');
        callback(null, null); // Devuelve null si no se encuentra ningún usuario
      }
    }
  });
};



exports.createUsuario = (usuario, callback) => {
  db.query('INSERT INTO usuarios SET ?', usuario, callback);
};

exports.updateUsuario = (id, usuario, callback) => {
  db.query('UPDATE usuarios SET ? WHERE id = ?', [usuario, id], callback);
};

exports.deleteUsuario = (id, callback) => {
  db.query('DELETE FROM usuarios WHERE id = ?', [id], callback);
};
