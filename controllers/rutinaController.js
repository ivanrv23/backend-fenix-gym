const Rutina = require('../models/Rutina');
const { successResponse, errorResponse } = require('../utils/helpers');

class RutinaController {
  static async createRutina(req, res) {
    try {
      console.log("Ya llegué al controlador.");
      const rutina = req.body;
      console.log("Data recibida:", rutina);

      const { experience, goal, days, duration, muscleGroups, name } = rutina;

      // Validar campos requeridos
      if (!experience || !goal || !days || !duration || !muscleGroups || !name) {
        return errorResponse(res, 'Todos los campos son obligatorios', 400);
      }

      // Guardar rutina en BD
      const newRutina = await Rutina.createRutina({
        experience,
        goal,
        days,
        duration,
        muscleGroups,
        name
      });

      if (!newRutina) {
        return errorResponse(res, 'Error al crear la rutina', 500);
      }

      return successResponse(res, {
        message: 'Rutina creada exitosamente',
        rutina: newRutina
      });
    } catch (error) {
      console.error('Error al crear rutina:', error);
      return errorResponse(res, 'Error interno del servidor', 500);
    }
  }
}

module.exports = RutinaController;
