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
    const query = 'SELECT * FROM users WHERE name_user = ?';
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
      if (usuario.state_user !== 1) {
        return res.status(401).json({
          success: false,
          message: 'Usuario inactivo'
        });
      }

      // Comparar contraseñas (sin encriptar)
      if (usuario.password_user !== password) {
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
          id_usuario: usuario.id_user,
          user: usuario.name_user,
          rol: usuario.id_role
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

// Obtener data de usuario
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  if (!userId || isNaN(userId)) {
    return res.status(400).json({
      success: false,
      message: 'ID de usuario no válido'
    });
  }
  try {
    const query = `SELECT * FROM users u
      INNER JOIN roles r ON u.id_role = r.id_role
      WHERE u.id_user = ?`;

    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error en consulta MySQL:', err);
        return res.status(500).json({
          success: false,
          message: 'Error del servidor al buscar usuario'
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      const user = results[0];
      const isMembershipActive = user.membership_status === 'active' &&
        new Date(user.expiration_date) > new Date();

      res.json({
        success: true,
        user: {
          id: user.id_user,
          firstName: user.name_user,
          lastName: user.name_user,
          email: user.name_user,
          phone: user.name_user,
          profileImage: user.photo_user,
          role: user.role_name,
          membershipActive: isMembershipActive,
          membershipExpiration: user.update_user,
          notifications: true
        }
      });
    });
  } catch (error) {
    console.error('Error en endpoint /user/:id:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// Escuchar en todas las interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🔥 Servidor corriendo en http://0.0.0.0:${PORT}`);
});