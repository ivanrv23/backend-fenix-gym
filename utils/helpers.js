const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hashear contraseña
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Comparar contraseña
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generar token JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Verificar token JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Token inválido');
  }
};

// Formatear respuesta exitosa
const successResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    ...data
  });
};

// Formatear respuesta de error
const errorResponse = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message: message
  });
};

// Validar membresia activa
const validateMembershipActive = (expiracion) => {
  try {
    if (!expiracion) return false;
    // Crear fechas (el formato YYYY-MM-DD es interpretado correctamente por JavaScript)
    const fechaExpiracion = new Date(expiracion);
    const fechaActual = new Date();
    // Ajustar ambas fechas a inicio del día para comparación precisa
    fechaActual.setHours(0, 0, 0, 0);
    // Validar que la fecha sea válida y que no haya expirado
    return !isNaN(fechaExpiracion.getTime()) && fechaExpiracion >= fechaActual;
  } catch (error) {
    console.error('Error al validar membresía:', error);
    return false;
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  successResponse,
  errorResponse,
  validateMembershipActive
};