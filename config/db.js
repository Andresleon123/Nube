const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'andresl', // Reemplaza 'andresl' con tu nombre de usuario de MySQL
  password: '123456789.', // Reemplaza '123456789.' con tu contraseña de MySQL
  database: 'crud' // Reemplaza 'crud' con el nombre de tu base de datos
});

module.exports = db;
