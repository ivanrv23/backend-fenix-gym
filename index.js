require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 5000;

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

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('🚀 Backend funcionando!');
});

// Ruta de login
app.post('/login', async (req, res) => {
  const { user, password } = req.body;

  try {
    // Buscar usuario por nombre de usuario
    const query = 'SELECT * FROM users WHERE user = ?';
    db.query(query, [user], (err, results) => {
      if (err) {
        console.error('Error en consulta MySQL:', err);
        return res.status(500).json({
          success: false,
          message: 'Error del servidor'
        });
      }

      // Verificar si el usuario existe
      if (results.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Usuario o contraseña incorrectos'
        });
      }

      const usuario = results[0];

      // Verificar estado del usuario (0 = inactivo, 1 = activo)
      if (usuario.estado !== 1) {
        return res.status(401).json({
          success: false,
          message: 'Usuario inactivo'
        });
      }

      // Comparar contraseñas (sin encriptar)
      if (usuario.password !== password) {
        return res.status(401).json({
          success: false,
          message: 'Usuario o contraseña incorrectos'
        });
      }

      // Login exitoso
      res.json({
        success: true,
        message: 'Login exitoso',
        userData: {
          id_usuario: usuario.id_usuario,
          user: usuario.user,
          rol: usuario.rol
        }
      });
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

// Escuchar en todas las interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🔥 Servidor corriendo en http://0.0.0.0:${PORT}`);
});