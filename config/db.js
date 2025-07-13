const mysql = require('mysql2/promise');

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Probar la conexión al iniciar
pool.getConnection()
  .then(connection => {
    console.log('✅ Conectado a MySQL como ID:', connection.threadId);
    
    // Test de conexión
    connection.query('SELECT 1 + 1 AS solution')
      .then(([rows]) => {
        console.log('✅ Test MySQL exitoso. Resultado:', rows[0].solution);
        connection.release();
      })
      .catch(err => {
        console.error('⚠️ Test MySQL fallido:', err);
        connection.release();
      });
  })
  .catch(err => {
    console.error('❌ Error conectando a MySQL:', err.stack);
  });

module.exports = pool;