const db = require('../config/db');

// Función auxiliar para mapear usuario
const mapUser = (user) => ({
  id: user.id_user,
  user: user.name_user,
  name: user.name_customer,
  lastname: user.lastname_customer,
  email: user.email_user,
  phone: user.phone_customer,
  photo: user.photo_user,
  idmembership: user.id_membership,
  namemembership: user.name_membership,
  statemembership: user.state_user === 1 && new Date(user.expiration_user) > new Date() 
                   ? "Activa" : "Inactiva",
  expirationmembership: user.expiration_user,
  joindate: user.created_user,
  lastlogin: user.login_user,
});

exports.getUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId) || userId <= 0) {
    return res.badRequest('ID de usuario inválido');
  }

  try {
    const [results] = await db.query(
      `SELECT * FROM users u 
       INNER JOIN memberships m ON u.id_membership = m.id_membership
       INNER JOIN customers c ON u.id_customer = c.id_customer 
       WHERE id_user = ?`,
      [userId]
    );

    if (results.length === 0) {
      return res.notFound('Usuario no encontrado');
    }

    res.success('Usuario obtenido', { user: mapUser(results[0]) });
  } catch (error) {
    console.error('Error en getUser:', error);
    res.serverError('Error al obtener usuario');
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    // Campos permitidos
    const allowedFields = ['name_customer', 'lastname_customer', 'email_user', 'phone_customer'];
    const validUpdate = {};
    
    Object.keys(updateData).forEach(field => {
      if (allowedFields.includes(field)) {
        validUpdate[field] = updateData[field];
      }
    });

    if (Object.keys(validUpdate).length === 0) {
      return res.badRequest('No hay campos válidos para actualizar');
    }

    // Actualizar en ambas tablas
    await db.query('UPDATE customers SET ? WHERE id_customer = (SELECT id_customer FROM users WHERE id_user = ?)', 
                  [validUpdate, userId]);
                  
    await db.query('UPDATE users SET ? WHERE id_user = ?', [validUpdate, userId]);

    // Obtener usuario actualizado
    const [updatedUser] = await db.query(
      `SELECT * FROM users u 
       INNER JOIN memberships m ON u.id_membership = m.id_membership
       INNER JOIN customers c ON u.id_customer = c.id_customer 
       WHERE id_user = ?`,
      [userId]
    );

    res.success('Perfil actualizado', { user: mapUser(updatedUser[0]) });
  } catch (error) {
    console.error('Error actualizando perfil:', error);
    res.serverError('Error al actualizar perfil');
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const [user] = await db.query(
      `SELECT * FROM users u 
       INNER JOIN memberships m ON u.id_membership = m.id_membership
       INNER JOIN customers c ON u.id_customer = c.id_customer 
       WHERE id_user = ?`,
      [req.user.id]
    );

    if (!user.length) return res.notFound("Usuario no encontrado");

    res.success("Datos de usuario", { user: mapUser(user[0]) });
  } catch (error) {
    console.error('Error en getCurrentUser:', error);
    res.serverError('Error al obtener usuario');
  }
};