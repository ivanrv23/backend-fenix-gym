module.exports = (req, res, next) => {
  // Respuestas exitosas
  res.success = (message, data) => {
    return res.json({ 
      success: true, 
      message,
      ...(data && { data }) // Incluir datos solo si existen
    });
  };
  
  // Errores comunes
  res.badRequest = (message = 'Solicitud inválida', details) => {
    return res.status(400).json({ 
      success: false, 
      message,
      ...(details && { details }),
      code: 'BAD_REQUEST'
    });
  };
  
  res.unauthorized = (message = 'No autorizado', details) => {
    return res.status(401).json({ 
      success: false, 
      message,
      ...(details && { details }),
      code: message.includes('expirado') ? 'TOKEN_EXPIRED' : 
            message.includes('Credenciales') ? 'INVALID_CREDENTIALS' : 
            'UNAUTHORIZED'
    });
  };
  
  res.forbidden = (message = 'Acceso prohibido', details) => {
    return res.status(403).json({ 
      success: false, 
      message,
      ...(details && { details }),
      code: 'FORBIDDEN'
    });
  };
  
  res.notFound = (message = 'Recurso no encontrado', details) => {
    return res.status(404).json({ 
      success: false, 
      message,
      ...(details && { details }),
      code: 'NOT_FOUND'
    });
  };
  
  res.serverError = (message = 'Error interno del servidor', details) => {
    return res.status(500).json({ 
      success: false, 
      message,
      ...(details && { details }),
      code: 'INTERNAL_SERVER_ERROR'
    });
  };

  next();
};