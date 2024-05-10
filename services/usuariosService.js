const db = require('../config/db');

exports.getAllUsuarios = (callback) => {
  db.query('SELECT * FROM usuarios', callback);
};

exports.getUsuarioById = (id, callback) => {
  const query = 'SELECT * FROM usuarios WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results[0]); // Asume que `results[0]` es el usuario buscado
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
