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