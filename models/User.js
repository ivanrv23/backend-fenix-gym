const db = require("../config/database");

class User {
  // Buscar usuario por email
  static async findByEmail(email) {
    try {
      const query = `
        SELECT * FROM users u 
        INNER JOIN memberships m ON u.id_membership = m.id_membership
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

  // Buscar usuario por ID con datos completos
  static async findByIdComplete(id) {
    try {
      const query = `
        SELECT 
          u.id_user, u.id_membership, u.id_customer,
          u.name_user, u.email_user, u.photo_user,
          u.expiration_user, u.login_user, u.created_user,
          u.state_user, u.token_user,
          c.document_customer, c.name_customer, c.lastname_customer,
          c.address_customer, c.phone_customer, c.birth_customer,
          c.weight_customer, c.stature_customer, c.gender_customer
        FROM users u 
        INNER JOIN customers c ON u.id_customer = c.id_customer
        WHERE u.id_user = ? AND u.state_user = 1
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

  // Actualizar token de usuario
  static async updateToken(id, token) {
    try {
      const query = `
        UPDATE users 
        SET token_user = ? 
        WHERE id_user = ?
      `;
      await db.execute(query, [token, id]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  // // Actualizar datos de perfil
  // static async updateProfile(iduser, nameuser, emailuser) {
  //   try {
  //     const query = `
  //       UPDATE users
  //       SET name_user = ?, email_user = ?
  //       WHERE id_user = ?
  //     `;
  //     const [result] = await db.execute(query, [nameuser, emailuser, iduser]);
  //     return result.affectedRows > 0;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // // Actualizar datos de cliente
  // static async updateCustomer(idcliente, documento, nombres, apellidos,
  //   direccion, telefono, nacimiento, peso, estatura, genero) {
  //   try {
  //     const query = `
  //       UPDATE customers
  //       SET document_customer = ?, name_customer = ?, lastname_customer = ?,
  //           address_customer = ?, phone_customer = ?, birth_customer = ?,
  //           weight_customer = ?, stature_customer = ?, gender_customer = ?
  //       WHERE id_customer = ?
  //     `;
  //     const [result] = await db.execute(query, [documento, nombres, apellidos,
  //       direccion, telefono, nacimiento, peso, estatura, genero, idcliente]);
  //     return result.affectedRows > 0;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  // Actualizar datos de perfil
  static async updateProfile(iduser, nameuser, emailuser) {
    try {
      const query = `
      UPDATE users 
      SET name_user = ?, email_user = ?
      WHERE id_user = ?
    `;

      // REMOVER la desestructuración [result] - usar directamente el resultado
      const result = await db.execute(query, [nameuser, emailuser, iduser]);

      // Para consultas UPDATE, result es un objeto con affectedRows
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error en updateProfile:", error);
      throw error;
    }
  }

  // Actualizar datos de cliente
  static async updateCustomer(
    idcliente,
    documento,
    nombres,
    apellidos,
    direccion,
    telefono,
    nacimiento,
    peso,
    estatura,
    genero
  ) {
    try {
      const query = `
      UPDATE customers 
      SET document_customer = ?, name_customer = ?, lastname_customer = ?, 
          address_customer = ?, phone_customer = ?, birth_customer = ?, 
          weight_customer = ?, stature_customer = ?, gender_customer = ?
      WHERE id_customer = ?
    `;

      // REMOVER la desestructuración [result] - usar directamente el resultado
      const result = await db.execute(query, [
        documento,
        nombres,
        apellidos,
        direccion,
        telefono,
        nacimiento,
        peso,
        estatura,
        genero,
        idcliente,
      ]);

      // Para consultas UPDATE, result es un objeto con affectedRows
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error en updateCustomer:", error);
      throw error;
    }
  }
}

module.exports = User;
