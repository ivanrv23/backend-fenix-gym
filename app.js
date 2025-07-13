require('dotenv').config();
const app = require('./config/server');
const responseHandler = require('./middlewares/responseHandler');

// Middleware de respuestas
app.use(responseHandler);

// Rutas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🔥 Servidor corriendo en http://0.0.0.0:${PORT}`);
});