const db = require("../config/database");

class Exercise {

  // Obtener lista de ejercicios
  static async getEjercicios() {
    try {
      const query = `SELECT * FROM exercises e INNER JOIN exercise_muscles em ON e.id_exercise = em.id_exercise
      INNER JOIN muscles m ON em.id_muscle = m.id_muscle INNER JOIN group_muscles g ON m.id_group = g.id_group
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
