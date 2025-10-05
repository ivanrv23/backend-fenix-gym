const Rutina = require('../models/Rutina');
const { successResponse, errorResponse } = require('../utils/helpers');

class RutinaController {

  static async getNivelesExperiencia(req, res) {
    try {
      const dataresult = await Rutina.getNivelesExperiencia();
      if (!dataresult || dataresult.length === 0) {
        return errorResponse(res, 'No se encontraron niveles de experiencia', 404);
      }
      return successResponse(res, {
          data: dataresult
        });
    } catch (error) {
      console.error('Error al obtener niveles:', error);
      return errorResponse(res, 'Error al obtener niveles', 500);
    }
  }

  static async getObjetivos(req, res) {
    try {
      const dataresult = await Rutina.getObjetivos();
      if (!dataresult || dataresult.length === 0) {
        return errorResponse(res, 'No se encontraron objetivos', 404);
      }
      return successResponse(res, {
          data: dataresult
        });
    } catch (error) {
      console.error('Error al obtener objetivos:', error);
      return errorResponse(res, 'Error al obtener objetivos', 500);
    }
  }

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
