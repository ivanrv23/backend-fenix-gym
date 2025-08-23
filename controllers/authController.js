const User = require('../models/User');
const { 
  comparePassword, 
  generateToken, 
  successResponse, 
  errorResponse 
} = require('../utils/helpers');

class AuthController {
  // Login de usuario
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validar campos requeridos
      if (!email || !password) {
        return errorResponse(res, 'Email y contraseña son requeridos', 400);
      }

      // Buscar usuario por email
      const user = await User.findByEmail(email);
      
      if (!user) {
        return errorResponse(res, 'Credenciales inválidas', 401);
      }

      // Verificar contraseña
      const isPasswordValid = await comparePassword(password, user.password_user);
      
      if (!isPasswordValid) {
        return errorResponse(res, 'Credenciales inválidas', 401);
      }

      // Verificar si la membresía está activa
      const isMembershipActive = await User.isMembershipActive(user.id_user);
      
      if (!isMembershipActive) {
        return errorResponse(res, 'Membresía expirada. Por favor, renueva tu membresía.', 403);
      }

      // Generar token
      const token = generateToken(user.id_user);

      // Actualizar último login
      await User.updateLoginTime(user.id_user);

      // Preparar respuesta del usuario
      const userResponse = {
        id: user.id_user,
        name: user.name_user,
        email: user.email_user,
        photo: user.photo_user,
        expiration: user.expiration_user,
        membership: user.id_membership
      };

      return successResponse(res, {
        message: 'Login exitoso',
        user: userResponse,
        token
      });

    } catch (error) {
      console.error('Error en login:', error);
      return errorResponse(res, 'Error interno del servidor', 500);
    }
  }

  // Verificar token
  static async verifyToken(req, res) {
    try {
      // El middleware auth ya verificó el token y añadió el usuario a req.user
      return successResponse(res, {
        user: req.user,
        valid: true
      });
    } catch (error) {
      console.error('Error verificando token:', error);
      return errorResponse(res, 'Error interno del servidor', 500);
    }
  }
}

module.exports = AuthController;