const db = require('../config/database');

class User {
  // Buscar usuario por email
  static async findByEmail(email) {
    try {
      const query = `
        SELECT * FROM users 
        WHERE email_user = ? AND state_user = 1
      `;
      const users = await db.execute(query, [email]);
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
  
  // Verificar si la membresía está activa
  static async isMembershipActive(id) {
    try {
      const user = await this.findById(id);
      if (!user) return false;
      
      const expirationDate = new Date(user.expiration_user);
      const today = new Date();
      
      return expirationDate >= today;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;