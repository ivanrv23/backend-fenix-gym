const mysql = require('mysql2/promise');
require('dotenv').config();

class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    
    this.testConnection();
  }
  
  async testConnection() {
    try {
      const connection = await this.pool.getConnection();
      console.log('✅ Conexión a la base de datos establecida');
      connection.release();
    } catch (error) {
      console.error('❌ Error conectando a la base de datos:', error.message);
      process.exit(1);
    }
  }
  
  async execute(query, params = []) {
    try {
      const [rows] = await this.pool.execute(query, params);
      return rows;
    } catch (error) {
      console.error('Error en consulta SQL:', error);
      throw error;
    }
  }
}

module.exports = new Database();