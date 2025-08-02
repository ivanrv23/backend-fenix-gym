const db = require('../config/db');

exports.getUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId || isNaN(userId)) {
    return res.badRequest('ID de usuario no válido');
  }

  try {
    const [results] = await db.query(
      `SELECT * FROM users u INNER JOIN memberships m ON u.id_membership = m.id_membership
      INNER JOIN customers c ON u.id_customer = c.id_customer WHERE id_user = ?`,
      [userId]
    );

    if (results.length === 0) {
      return res.notFound('Usuario no encontrado');
    }

    const user = results[0];
    const isMembershipActive = user.state_user === 1 && new Date(user.expiration_user) > new Date()
      ? "Activa" : "Inactiva";

    res.success('Usuario obtenido', {
      user: {
        id: user.id_user,
        user: user.name_user,
        name: user.name_customer,
        lastname: user.lastname_customer,
        email: user.email_user,
        phone: user.phone_customer,
        photo: user.photo_user,
        idmembership: user.id_membership,
        namemembership: user.name_membership,
        statemembership: isMembershipActive,
        expirationmembership: user.expiration_user,
        joindate: user.created_user,
        lastlogin: user.login_user,
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
      `SELECT * FROM users u INNER JOIN memberships m ON u.id_membership = m.id_membership
      INNER JOIN customers c ON u.id_customer = c.id_customer WHERE id_user = ?`,
      [req.user.id]
    );

    if (!user.length) return res.notFound("Usuario no encontrado");

    res.success("Datos de usuario", {
      id: user[0].id_user,
      user: user[0].name_user,
      name: user[0].name_customer,
      lastname: user[0].lastname_customer,
      email: user[0].email_user,
      phone: user[0].phone_customer,
      photo: user[0].photo_user,
      idmembership: user[0].id_membership,
      namemembership: user[0].name_membership,
      statemembership:
        user[0].state_user === 1 && new Date(user[0].expiration_user) > new Date()
          ? "Activa" : "Inactiva",
      expirationmembership: user[0].expiration_user,
      joindate: user[0].created_user,
      lastlogin: user[0].login_user,
    });
  } catch (error) {
    res.serverError();
  }
};