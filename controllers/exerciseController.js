const Exercise = require('../models/Exercise');
const { successResponse, errorResponse } = require('../utils/helpers');

class ExerciseController {

  static async getEjercicios(req, res) {
    try {
      const dataresult = await Exercise.getEjercicios();
      if (!dataresult || dataresult.length === 0) {
        return errorResponse(res, 'No se encontraron ejercicios', 404);
      }
      return successResponse(res, {
          data: dataresult
        });
    } catch (error) {
      console.error('Error al obtener ejercicios:', error);
      return errorResponse(res, 'Error al obtener ejercicios', 500);
    }
  }

}

module.exports = ExerciseController;
