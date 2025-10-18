const db = require("../config/database");

class Exercise {

  // Obtener lista de ejercicios
  static async getEjercicios() {
    try {
      const query = `SELECT * FROM exercises e INNER JOIN muscles m ON e.id_muscle = m.id_muscle
      WHERE e.state_exercise = 1 AND m.state_muscle = 1`;
      const rows = await db.execute(query);
      return rows;
    } catch (error) {
      console.error("Error en base de datos:", error);
      throw error;
    }
  }

}

module.exports = Exercise;
