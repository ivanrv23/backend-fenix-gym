const db = require('../config/database');

class User {
  // Buscar usuario por email
  static async findByEmail(email) {
    try {
      const query = `
        SELECT * FROM users u INNER JOIN memberships m ON u.id_membership = m.id_membership
        INNER JOIN customers c ON u.id_customer = c.id_customer
        WHERE u.email_user = ? OR u.name_user = ?
      `;
      const users = await db.execute(query, [email, email]);
      return users[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Buscar usuario por ID
  static async findById(id) {
    try {
      const query = `
        SELECT 
          id_user, id_membership, id_customer, 
          name_user, email_user, photo_user, 
          expiration_user, login_user, created_user 
        FROM users 
        WHERE id_user = ? AND state_user = 1
      `;
      const users = await db.execute(query, [id]);
      return users[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Actualizar último login
  static async updateLoginTime(id) {
    try {
      const query = `
        UPDATE users 
        SET login_user = NOW() 
        WHERE id_user = ?
      `;
      await db.execute(query, [id]);
    } catch (error) {
      throw error;
    }
  }

  // Actualizar datos de perfil
  static async updateProfile(iduser, nameuser, emailuser) {
    try {
      const query = `
        UPDATE users 
        SET name_user = ?, email_user = ?
        WHERE id_user = ?
      `;
      const [result] = await db.execute(query, [nameuser, emailuser, iduser]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Actualizar datos de cliente
  static async updateCustomer(idcliente, documento, nombres, apellidos,
      direccion, telefono, nacimiento, peso, estatura, genero) {
    try {
      const query = `
        UPDATE customers 
        SET document_customer = ?, name_customer = ?, lastname_customer = ?, address_customer = ?,
        phone_customer = ?, birth_customer = ?, weight_customer = ?, stature_customer = ?, gender_customer = ?
        WHERE id_customer = ?
      `;
      await db.execute(query, [documento, nombres, apellidos,
      direccion, telefono, nacimiento, peso, estatura, genero, idcliente]);
      const [result] = await db.execute(query, [documento, nombres, apellidos,
      direccion, telefono, nacimiento, peso, estatura, genero, idcliente]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;