// database.js
const mysql = require('mysql');
require('dotenv').config();

// Configuración de MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

// Conectar a MySQL
db.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err.stack);
    return;
  }
  console.log('✅ Conectado a MySQL como ID:', db.threadId);
  
  // Test de conexión a MySQL
  db.query('SELECT 1 + 1 AS solution', (error, results) => {
    if (error) {
      console.error('Error probando MySQL:', error);
    } else {
      console.log('✅ Test MySQL exitoso. Resultado:', results[0].solution);
    }
  });
});

// Consultas de usuarios
const userQueries = {
  getUserByUsername: (username, callback) => {
    const query = 'SELECT * FROM users WHERE name_user = ?';
    db.query(query, [username], callback);
  }
};

module.exports = {
  db,
  userQueries
};