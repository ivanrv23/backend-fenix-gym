const db = require("../config/database");

class Rutina {
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
