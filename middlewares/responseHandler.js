module.exports = (req, res, next) => {
  // Respuestas exitosas
  res.success = (message, data) => {
    return res.json({ success: true, message, ...data });
  };
  
  // Errores comunes
  res.badRequest = (message = 'Solicitud inválida') => {
    return res.status(400).json({ success: false, message });
  };
  
  res.unauthorized = (message = 'No autorizado') => {
    return res.status(401).json({ 
      success: false, 
      message,
      code: message.includes('expirado') ? 'TOKEN_EXPIRED' : 'UNAUTHORIZED'
    });
  };
  
  res.notFound = (message = 'Recurso no encontrado') => {
    return res.status(404).json({ success: false, message });
  };
  
  res.serverError = (message = 'Error interno del servidor') => {
    return res.status(500).json({ success: false, message });
  };

  next();
};