const jwt = require('jsonwebtoken');
const db = require('../config/db');

module.exports.authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.unauthorized('Acceso no autorizado');
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.unauthorized('Formato de token inválido');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verificar que no sea un refresh token
    if (decoded.type === 'refresh') {
      return res.unauthorized('Tipo de token inválido');
    }
    
    const [users] = await db.query(
      `SELECT id_user, state_user, token_user 
       FROM users 
       WHERE id_user = ? AND state_user = 1`,
      [decoded.id]
    );
    
    if (!users.length) {
      return res.unauthorized('Usuario no válido');
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
        message: 'Acceso restringido'
      });
    }
    next();
  };
};