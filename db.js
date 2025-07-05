// backend/db.js
const mysql = require('mysql');
require('dotenv').config();

// Crear conexión a MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err.stack);
    return;
  }
  console.log('✅ Conectado a MySQL como ID:', db.threadId);
});

module.exports = db;