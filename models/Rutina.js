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

  // Validar si ya existe rutina con los mismos parámetros
  static async validateExistRutina(usuario, experience, goal, days, duration) {
    try {
      const query = `
        SELECT * FROM routines WHERE id_user = ? AND id_level = ? AND id_goal = ? AND id_day = ?
        AND id_duration = ? LIMIT 1
      `;
      const rows = await db.execute(query, [usuario, experience, goal, days, duration]);
      return rows && rows.length > 0;
    } catch (error) {
      console.error("Error en validateExistRutina:", error);
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
      const query = `SELECT * FROM routines r INNER JOIN levels l ON r.id_level = l.id_level
      INNER JOIN goals g ON r.id_goal = g.id_goal INNER JOIN days d
      ON r.id_day = d.id_day WHERE r.id_user = ?`;
      const rows = await db.execute(query, [idusuario]);
      return rows;
    } catch (error) {
      console.error("Error en base de datos:", error);
      throw error;
    }
  }

  // Obtener ejercicios de rutina por id
  static async getRutinaDetails(idrutina) {
    try {
      const query = `SELECT r.*, e.name_exercise, e.instruction_exercise, e.description_exercise,
      e.video_exercise, em.level_detail, m.name_muscle, m.description_muscle
      FROM routine_detail r INNER JOIN exercises e ON r.id_exercise = e.id_exercise
      INNER JOIN exercise_muscles em ON e.id_exercise = em.id_exercise
      INNER JOIN muscles m ON em.id_muscle = m.id_muscle WHERE r.id_routine = ?`;
      const rows = await db.execute(query, [idrutina]);
      return rows;
    } catch (error) {
      console.error("Error en base de datos:", error);
      throw error;
    }
  }
}

module.exports = Rutina;
