const { verifyToken } = require('../utils/helpers');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token de acceso requerido' 
      });
    }

    // Verificar token
    const decoded = verifyToken(token);
    
    // Buscar usuario
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token inválido - usuario no existe' 
      });
    }

    // Verificar si la membresía está activa
    const isMembershipActive = await User.isMembershipActive(user.id_user);
    
    if (!isMembershipActive) {
      return res.status(403).json({ 
        success: false, 
        message: 'Membresía expirada' 
      });
    }

    // Añadir usuario a la request
    req.user = user;
    next();
  } catch (error) {
    console.error('Error en middleware de autenticación:', error);
    return res.status(401).json({ 
      success: false, 
      message: 'Token inválido' 
    });
  }
};

module.exports = auth;