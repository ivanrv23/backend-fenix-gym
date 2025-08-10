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
    console.log("=== UPDATE PROFILE CONTROLLER ===");
    console.log("Usuario ID:", req.user.id);
    console.log("Datos recibidos:", req.body);

    const userId = req.user.id;
    const updateData = req.body;

    // Validar que hay datos para actualizar
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.badRequest('No se enviaron datos para actualizar');
    }

    // CORRECCIÓN: Campos permitidos completos según lo que envías
    const allowedFields = ['email', 'lastname', 'name', 'phone', 'photo', 'user'];
    const validUpdate = {};

    console.log("Campos recibidos:", Object.keys(updateData));

    Object.keys(updateData).forEach(field => {
      // CORRECCIÓN: usar 'field' en lugar de 'key'
      console.log(`Procesando campo: "${field}" - Valor: "${updateData[field]}" - Permitido: ${allowedFields.includes(field)}`);

      if (allowedFields.includes(field) && updateData[field] !== undefined && updateData[field] !== null && updateData[field] !== '') {
        validUpdate[field] = updateData[field];
      }
    });

    console.log("Datos válidos para actualizar:", validUpdate);
    console.log("Cantidad de campos válidos:", Object.keys(validUpdate).length);

    if (Object.keys(validUpdate).length === 0) {
      return res.badRequest('No hay campos válidos para actualizar');
    }

    // Separar campos por tabla
    const customerFields = {};
    const userFields = {};

    // Campos para tabla customers: name, lastname, phone
    if (validUpdate.name) customerFields.name = validUpdate.name;
    if (validUpdate.lastname) customerFields.lastname = validUpdate.lastname;
    if (validUpdate.phone) customerFields.phone = validUpdate.phone;

    // Campos para tabla users: email, photo, user
    if (validUpdate.email) userFields.email = validUpdate.email.toLowerCase();
    if (validUpdate.photo) userFields.photo = validUpdate.photo;
    if (validUpdate.user) userFields.user = validUpdate.user.toLowerCase();

    console.log("Campos para customers:", customerFields);
    console.log("Campos para users:", userFields);

    // Validaciones adicionales
    if (validUpdate.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(validUpdate.email)) {
        return res.badRequest('Formato de email inválido');
      }
    }

    // Actualizar tabla customers si hay campos
    if (Object.keys(customerFields).length > 0) {
      console.log("Actualizando tabla customers...");
      const customerResult = await db.query(
        'UPDATE customers SET ? WHERE id_customer = (SELECT id_customer FROM users WHERE id_user = ?)',
        [customerFields, userId]
      );
      console.log("✅ Tabla customers actualizada, filas afectadas:", customerResult.affectedRows);
    }

    // Actualizar tabla users si hay campos
    if (Object.keys(userFields).length > 0) {
      console.log("Actualizando tabla users...");
      const userResult = await db.query('UPDATE users SET ? WHERE id_user = ?', [userFields, userId]);
      console.log("✅ Tabla users actualizada, filas afectadas:", userResult.affectedRows);
    }

    // Obtener usuario actualizado
    console.log("Obteniendo usuario actualizado...");
    const [updatedUser] = await db.query(
      `SELECT * FROM users u 
       INNER JOIN memberships m ON u.id_membership = m.id_membership
       INNER JOIN customers c ON u.id_customer = c.id_customer 
       WHERE id_user = ?`,
      [userId]
    );

    if (!updatedUser || updatedUser.length === 0) {
      return res.serverError('Error al obtener usuario actualizado');
    }

    const mappedUser = mapUser(updatedUser[0]);
    console.log("✅ Perfil actualizado exitosamente");

    // Respuesta en el formato que espera tu frontend
    res.success('Perfil actualizado exitosamente', { user: mappedUser });

  } catch (error) {
    console.error('❌ Error actualizando perfil:', error);

    // Manejar errores específicos
    if (error.code === 'ER_DUP_ENTRY') {
      return res.badRequest('El email o nombre de usuario ya está en uso');
    }

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