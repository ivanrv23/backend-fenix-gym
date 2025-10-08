const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { comparePassword, generateToken, successResponse, errorResponse,
  validateMembershipActive } = require('../utils/helpers');

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
        return errorResponse(res, 'Cuenta eliminada. Consulte a su proveedor.', 403);
      }
      // Generar token
      const token = generateToken(user.id_user);
      // Actualizar último login y token en la base de datos
      await User.updateLoginTime(user.id_user);
      await User.updateToken(user.id_user, token);
      // Verificar si la membresía está activa
      const isMembershipActive = await validateMembershipActive(user.expiration_user);
      // Preparar respuesta del usuario
      const userResponse = {
        id_user: user.id_user,
        id_customer: user.id_customer,
        name_user: user.name_user,
        email_user: user.email_user,
        token_user: token, // Usar el token generado
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
        id_membership: user.id_membership,
        name_membership: user.name_membership,
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

  // Logout de usuario
  static async logout(req, res) {
    try {
      // Obtener el ID del usuario del token verificado por el middleware
      const userId = req.user.id_user;
      // Actualizar token a null en la base de datos
      await User.updateToken(userId, null);
      return successResponse(res, {
        message: 'Logout exitoso'
      });
    } catch (error) {
      console.error('Error en logout:', error);
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

  static async updateProfile(req, res) {
    try {
      const {
        iduser, nameuser, emailuser, photouser,
        idcliente, documento, nombres, apellidos,
        direccion, telefono, nacimiento, peso, estatura, genero
      } = req.body;

      // Validar campos requeridos
      if (!iduser || !idcliente) {
        return errorResponse(res, 'Sin datos', 400);
      }

      // Verificar que el usuario que está actualizando es el mismo del token
      if (req.user && req.user.id_user !== parseInt(iduser)) {
        return errorResponse(res, 'No tienes permisos para actualizar este perfil', 403);
      }

      // Verificar que el usuario existe
      const existingUser = await User.findById(iduser);
      if (!existingUser) {
        return errorResponse(res, 'Usuario no encontrado', 404);
      }

      try {
        // Actualizar tabla users
        if (nameuser || emailuser || photouser) {
          await User.updateProfile(iduser, nameuser, emailuser, photouser);
          console.log('Usuario actualizado en tabla users');
        }

        // Actualizar tabla customers
        if (idcliente && (documento || nombres || apellidos || direccion ||
          telefono || nacimiento || peso || estatura || genero)) {
          await User.updateCustomer(
            idcliente, documento, nombres, apellidos,
            direccion, telefono, nacimiento, peso, estatura, genero
          );
          console.log('Cliente actualizado en tabla customers');
        }

        // Obtener los datos actualizados
        const updatedUserData = await User.findByIdComplete(iduser);

        if (!updatedUserData) {
          return errorResponse(res, 'Error al obtener datos actualizados', 500);
        }
        // Generar token
        const token = generateToken(updatedUserData.id_user);
        const isMembershipActive = await validateMembershipActive(updatedUserData.expiration_user);
        // Preparar respuesta con datos actualizados
        const userResponse = {
          id_user: updatedUserData.id_user,
          id_customer: updatedUserData.id_customer,
          name_user: updatedUserData.name_user,
          email_user: updatedUserData.email_user,
          token_user: token, // Usar el token generado
          photo_user: updatedUserData.photo_user,
          expiration_user: updatedUserData.expiration_user,
          login_user: updatedUserData.login_user,
          state_user: updatedUserData.state_user,
          created_user: updatedUserData.created_user,
          document_customer: updatedUserData.document_customer,
          name_customer: updatedUserData.name_customer,
          lastname_customer: updatedUserData.lastname_customer,
          address_customer: updatedUserData.address_customer,
          phone_customer: updatedUserData.phone_customer,
          birth_customer: updatedUserData.birth_customer,
          weight_customer: updatedUserData.weight_customer,
          stature_customer: updatedUserData.stature_customer,
          gender_customer: updatedUserData.gender_customer,
          id_membership: updatedUserData.id_membership,
          name_membership: updatedUserData.name_membership,
          state_membership: isMembershipActive
        };
        return successResponse(res, {
          message: 'Perfil actualizado exitosamente',
          userData: userResponse
        });
      } catch (updateError) {
        console.error('Error en transacción de actualización:', updateError);
        return errorResponse(res, 'Error al actualizar los datos', 500);
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      return errorResponse(res, 'Error interno del servidor', 500);
    }
  }

  static async updatePassword(req, res) {
    try {
      const { iduser, currentPassword, newPassword } = req.body;
      // Validar campos requeridos
      if (!iduser || !currentPassword || !newPassword) {
        return errorResponse(res, 'Sin datos', 400);
      }
      // Verificar que el usuario que está actualizando es el mismo del token
      if (req.user && req.user.id_user !== parseInt(iduser)) {
        return errorResponse(res, 'No tienes permisos para cambiar contraseña', 403);
      }
      // Verificar que la contraseña actual es correcta
      const existingUser = await User.findById(iduser);
      if (existingUser) {
        console.log(existingUser);
        const isPasswordValid = await comparePassword(currentPassword, existingUser.password_user);
        if (!isPasswordValid) {
          return errorResponse(res, 'La contraseña actual no es la misma', 401);
        }
      } else {
        return errorResponse(res, 'No se pudo verificar la contraseña.', 404);
      }
      try {
        // Actualizar tabla users
        const newHashedPass = await bcrypt.hash(newPassword, 10);
        const updated = await User.updatePassword(iduser, newHashedPass);
        if (!updated) {
          return errorResponse(res, 'Error al cambia de contraseña', 500);
        }
        // Obtener los datos actualizados
        const updatedUserData = await User.findByIdComplete(iduser);
        if (!updatedUserData) {
          return errorResponse(res, 'Error al obtener datos actualizados', 500);
        }
        // Generar token
        const token = generateToken(updatedUserData.id_user);
        const isMembershipActive = await validateMembershipActive(updatedUserData.expiration_user);
        // Preparar respuesta con datos actualizados
        const userResponse = {
          id_user: updatedUserData.id_user,
          id_customer: updatedUserData.id_customer,
          name_user: updatedUserData.name_user,
          email_user: updatedUserData.email_user,
          token_user: token, // Usar el token generado
          photo_user: updatedUserData.photo_user,
          expiration_user: updatedUserData.expiration_user,
          login_user: updatedUserData.login_user,
          state_user: updatedUserData.state_user,
          created_user: updatedUserData.created_user,
          document_customer: updatedUserData.document_customer,
          name_customer: updatedUserData.name_customer,
          lastname_customer: updatedUserData.lastname_customer,
          address_customer: updatedUserData.address_customer,
          phone_customer: updatedUserData.phone_customer,
          birth_customer: updatedUserData.birth_customer,
          weight_customer: updatedUserData.weight_customer,
          stature_customer: updatedUserData.stature_customer,
          gender_customer: updatedUserData.gender_customer,
          id_membership: updatedUserData.id_membership,
          name_membership: updatedUserData.name_membership,
          state_membership: isMembershipActive
        };
        return successResponse(res, {
          message: 'Contraseña actualizada exitosamente',
          userData: userResponse
        });
      } catch (updateError) {
        console.error('Error al actualizar pass:', updateError);
        return errorResponse(res, 'Error al actualizar pass', 500);
      }
    } catch (error) {
      console.error('Error al actualizar pass:', error);
      return errorResponse(res, 'Error interno del servidor', 500);
    }
  }

  static async deleteAccount(req, res) {
    try {
      const { iduser, password } = req.body;
      // Validar campos requeridos
      if (!iduser || !password) {
        return errorResponse(res, 'Sin datos', 400);
      }
      // Verificar que el usuario que está actualizando es el mismo del token
      if (req.user && req.user.id_user !== parseInt(iduser)) {
        return errorResponse(res, 'No tienes permisos para eliminar cuenta', 403);
      }
      // Verificar que la contraseña actual es correcta
      const existingUser = await User.findById(iduser);
      if (existingUser) {
        console.log(existingUser);
        const isPasswordValid = await comparePassword(password, existingUser.password_user);
        if (!isPasswordValid) {
          return errorResponse(res, 'La contraseña actual no es la misma', 401);
        }
      } else {
        return errorResponse(res, 'No se pudo verificar la contraseña.', 404);
      }
      try {
        // Actualizar tabla users
        const deleted = await User.deleteAccount(iduser);
        if (!deleted) {
          return errorResponse(res, 'Error al eliminar cuenta', 500);
        }
        return successResponse(res, {
          message: 'Cuenta eliminada exitosamente',
          success: deleted
        });
      } catch (updateError) {
        console.error('Error eliminado cuenta:', updateError);
        return errorResponse(res, 'Error eliminado cuenta', 500);
      }
    } catch (error) {
      console.error('Error eliminado cuenta:', error);
      return errorResponse(res, 'Error interno del servidor', 500);
    }
  }

  static async applyPromotionCode(req, res) {
    try {
      const { iduser, promoCode } = req.body;

      // Validar campos requeridos
      if (!iduser || !promoCode) {
        return errorResponse(res, 'Sin datos', 400);
      }

      // Verificar que el usuario que está actualizando es el mismo del token
      if (req.user && req.user.id_user !== parseInt(iduser)) {
        return errorResponse(res, 'No tienes permiso para aplicar el código', 403);
      }

      // Verificar que el usuario existe
      const existingUser = await User.findById(iduser);
      if (!existingUser) {
        return errorResponse(res, 'Usuario no encontrado', 404);
      }

      try {
        // Verificar que el código existe
        const existingCode = await User.findPromotionCode(promoCode);
        console.log('Codes: ', existingCode);
        if (existingCode && existingCode.id_membership && existingUser.expiration_user) {
          const dias = existingCode.days_membership;
          const fechafin = new Date(existingUser.expiration_user); // Convertir string DATE a objeto Date
          const hoy = new Date();
          // Limpiar las horas para comparar solo fechas
          hoy.setHours(0, 0, 0, 0);
          fechafin.setHours(0, 0, 0, 0);
          let nuevafechafin;
          // Validar si fechafin es mayor a hoy
          if (fechafin > hoy) {
            // Si la membresía aún está vigente, sumar días a la fecha de expiración actual
            nuevafechafin = new Date(fechafin);
            nuevafechafin.setDate(nuevafechafin.getDate() + dias);
          } else {
            // Si la membresía ya expiró, sumar días desde hoy
            nuevafechafin = new Date(hoy);
            nuevafechafin.setDate(nuevafechafin.getDate() + dias);
          }

          // Convertir a formato DATE para la base de datos (YYYY-MM-DD)
          const fechafinFormatted = nuevafechafin.toISOString().split('T')[0];

          const updated = await User.applyPromotionCode(iduser, existingCode.id_membership, fechafinFormatted);
          console.log('Usuario actualizado en tabla users');
          // Obtener los datos actualizados
          const updatedUserData = await User.findByIdComplete(iduser);

          if (!updatedUserData) {
            return errorResponse(res, 'Error al obtener datos actualizados', 500);
          }
          // Generar token
          const token = generateToken(updatedUserData.id_user);
          const isMembershipActive = await validateMembershipActive(updatedUserData.expiration_user);
          // Preparar respuesta con datos actualizados
          const userResponse = {
            id_user: updatedUserData.id_user,
            id_customer: updatedUserData.id_customer,
            name_user: updatedUserData.name_user,
            email_user: updatedUserData.email_user,
            token_user: token, // Usar el token generado
            photo_user: updatedUserData.photo_user,
            expiration_user: updatedUserData.expiration_user,
            login_user: updatedUserData.login_user,
            state_user: updatedUserData.state_user,
            created_user: updatedUserData.created_user,
            document_customer: updatedUserData.document_customer,
            name_customer: updatedUserData.name_customer,
            lastname_customer: updatedUserData.lastname_customer,
            address_customer: updatedUserData.address_customer,
            phone_customer: updatedUserData.phone_customer,
            birth_customer: updatedUserData.birth_customer,
            weight_customer: updatedUserData.weight_customer,
            stature_customer: updatedUserData.stature_customer,
            gender_customer: updatedUserData.gender_customer,
            id_membership: updatedUserData.id_membership,
            name_membership: updatedUserData.name_membership,
            state_membership: isMembershipActive
          };
          return successResponse(res, {
            message: 'Perfil actualizado exitosamente',
            userData: userResponse
          });
        }
      } catch (updateError) {
        console.error('Error en transacción de actualización:', updateError);
        return errorResponse(res, 'Error al actualizar los datos', 500);
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      return errorResponse(res, 'Error interno del servidor', 500);
    }
  }

}

module.exports = AuthController;