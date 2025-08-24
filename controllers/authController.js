const User = require('../models/User');
const {
  comparePassword,
  generateToken,
  successResponse,
  errorResponse, validateMembershipActive
} = require('../utils/helpers');

class AuthController {
  // Login de usuario
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      // Validar campos requeridos
      if (!email || !password) {
        return errorResponse(res, 'Usuario y contraseña son requeridos', 400);
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
      // Verificar si la el usuario está activo
      if (user.state_user !== 1) {
        return errorResponse(res, 'Usuario inhabilitado. Consulte a su proveedor.', 403);
      }
      // Verificar si la membresía está activa
      const isMembershipActive = await validateMembershipActive(user.expiration_user);
      // Generar token
      const token = generateToken(user.id_user);
      // Actualizar último login
      await User.updateLoginTime(user.id_user);
      // Preparar respuesta del usuario
      const userResponse = {
        id_user: user.id_user,
        id_customer: user.id_customer,
        name_user: user.name_user,
        email_user: user.email_user,
        token_user: user.token_user,
        photo_user: user.photo_user,
        expiration_user: user.expiration_user,
        login_user: user.login_user,
        state_user: user.state_user,
        created_user: user.created_user,
        document_customer: user.document_customer,
        name_customer: user.name_customer,
        lastname_customer: user.lastname_customer,
        address_customer: user.address_customer,
        phone_customer: user.phone_customer,
        birth_customer: user.birth_customer,
        weight_customer: user.weight_customer,
        stature_customer: user.stature_customer,
        gender_customer: user.gender_customer,
        state_membership: isMembershipActive
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