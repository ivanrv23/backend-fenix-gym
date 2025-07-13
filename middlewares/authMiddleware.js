const jwt = require('jsonwebtoken');
const db = require('../config/db');

module.exports.authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.unauthorized('Token de autenticación no proporcionado');
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verificar token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verificar en DB que el usuario existe y está activo
    const [users] = await db.query(
      'SELECT id_user, state_user FROM users WHERE id_user = ?',
      [decoded.id]
    );
    
    if (!users.length || users[0].state_user !== 1) {
      return res.unauthorized('Usuario no válido o inactivo');
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.unauthorized('Token expirado');
    }
    res.unauthorized('Token inválido');
  }
};

module.exports.requireRole = (requiredRoles) => {
  return (req, res, next) => {
    if (!requiredRoles.includes(req.user.rol)) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para realizar esta acción'
      });
    }
    next();
  };
};