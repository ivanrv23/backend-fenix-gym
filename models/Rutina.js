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

  // Crear nueva rutina
  static async createRutina({ experience, goal, days, duration, muscleGroups, name }) {
    try {
      const query = `
        INSERT INTO rutinas 
        (name, experience, goal, days, duration, muscle_groups, created_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW())
      `;

      const [result] = await db.execute(query, [
        name,
        experience,
        goal,
        days,
        duration,
        JSON.stringify(muscleGroups) // si es array, lo guardamos como JSON
      ]);

      if (result.affectedRows > 0) {
        return {
          id: result.insertId,
          name,
          experience,
          goal,
          days,
          duration,
          muscleGroups
        };
      }
      return null;
    } catch (error) {
      console.error("Error en createRutina:", error);
      throw error;
    }
  }
}

module.exports = Rutina;
