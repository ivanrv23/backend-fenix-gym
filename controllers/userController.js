const db = require('../config/db');

exports.getUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId || isNaN(userId)) {
    return res.badRequest('ID de usuario no válido');
  }

  try {
    const [results] = await db.query(
      `SELECT u.*, r.role_name 
       FROM users u
       INNER JOIN roles r ON u.id_role = r.id_role
       WHERE u.id_user = ?`,
      [userId]
    );

    if (results.length === 0) {
      return res.notFound('Usuario no encontrado');
    }

    const user = results[0];
    const isMembershipActive = user.membership_status === 'active' &&
      new Date(user.expiration_date) > new Date();

    res.success('Usuario obtenido', {
      user: {
        id: user.id_user,
        firstName: user.first_name || user.name_user,
        lastName: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        profileImage: user.photo_user || '',
        role: user.role_name,
        membershipActive: isMembershipActive,
        membershipExpiration: user.expiration_date || null,
        notifications: true
      }
    });
  } catch (error) {
    console.error('Error en getUser:', error);
    res.serverError();
  }
};

// Ejemplo de función para actualizar perfil de usuario
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    // Validar datos permitidos
    const allowedFields = ['firstName', 'lastName', 'email', 'phone', 'notifications'];
    const validUpdate = {};

    for (const field in updateData) {
      if (allowedFields.includes(field)) {
        validUpdate[field] = updateData[field];
      }
    }

    // Actualizar en la base de datos
    await db.query(
      `UPDATE users 
       SET ?
       WHERE id_user = ?`,
      [validUpdate, userId]
    );

    res.success('Perfil actualizado correctamente');
  } catch (error) {
    console.error('Error actualizando perfil:', error);
    res.serverError('Error al actualizar el perfil');
  }
};

// En tu userController.js
exports.getCurrentUser = async (req, res) => {
  try {
    const [user] = await db.query(
      `SELECT *
      FROM users WHERE id_user = ?`,
      [req.user.id]
    );

    if (!user.length) return res.notFound("Usuario no encontrado");

    res.success("Datos de usuario", {
      id: user[0].id_user,
      firstName: user[0].first_name || user[0].name_user,
      lastName: user[0].last_name || '',
      email: user[0].email || '',
      phone: user[0].phone || '',
      profileImage: user[0].photo_user || '',
      role: user[0].role_name,
      membershipActive: isMembershipActive,
      membershipExpiration: user[0].expiration_date || null,
      notifications: true
    });
  } catch (error) {
    res.serverError();
  }
};