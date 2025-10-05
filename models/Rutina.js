const db = require("../config/database");

class Rutina {

  // Obtener lista de niveles de experiencia
  static async getNivelesExperiencia() {
    try {
      const query = `SELECT * FROM levels WHERE state_level = 1`;
      const rows = await db.execute(query);
      return rows;
    } catch (error) {
      console.error("Error en base de datos:", error);
      throw error;
    }
  }

  // Obtener lista de metas
  static async getObjetivos() {
    try {
      const query = `SELECT * FROM goals WHERE state_goal = 1`;
      const rows = await db.execute(query);
      return rows;
    } catch (error) {
      console.error("Error en base de datos:", error);
      throw error;
    }
  }

  // Obtener lista de dias
  static async getDiasSemana() {
    try {
      const query = `SELECT * FROM days WHERE state_day = 1`;
      const rows = await db.execute(query);
      return rows;
    } catch (error) {
      console.error("Error en base de datos:", error);
      throw error;
    }
  }

  // Obtener lista de duración en minutos
  static async getMinutosDuracion() {
    try {
      const query = `SELECT * FROM durations WHERE state_duration = 1`;
      const rows = await db.execute(query);
      return rows;
    } catch (error) {
      console.error("Error en base de datos:", error);
      throw error;
    }
  }

  // Crear nueva rutina
  static async createRutina(usuario, experience, goal, days, duration, style) {
    try {
      const query = `
        INSERT INTO routines 
        (id_user, id_level, id_goal, id_day, id_duration, date_routine)
        VALUES (?, ?, ?, ?, ?, NOW())
      `;
      const result = await db.execute(query, [usuario, experience, goal, days, duration]);
      if (result.affectedRows > 0) {
        return {
          id: result.insertId,
          usuario, experience, goal, days, duration
        };
      }
      return null;
    } catch (error) {
      console.error("Error en createRutina:", error);
      throw error;
    }
  }

  // Obtener lista de rutinas por usuario
  static async getRutinasUsuario(idusuario) {
    try {
      const query = `SELECT * FROM routines WHERE id_user = ?`;
      const rows = await db.execute(query, [idusuario]);
      return rows;
    } catch (error) {
      console.error("Error en base de datos:", error);
      throw error;
    }
  }
}

module.exports = Rutina;
