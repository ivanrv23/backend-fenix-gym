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

  static async getDiasSemana(req, res) {
    try {
      const dataresult = await Rutina.getDiasSemana();
      if (!dataresult || dataresult.length === 0) {
        return errorResponse(res, 'No se encontraron dias', 404);
      }
      return successResponse(res, {
          data: dataresult
        });
    } catch (error) {
      console.error('Error al obtener dias:', error);
      return errorResponse(res, 'Error al obtener dias', 500);
    }
  }

  static async getMinutosDuracion(req, res) {
    try {
      const dataresult = await Rutina.getMinutosDuracion();
      if (!dataresult || dataresult.length === 0) {
        return errorResponse(res, 'No se encontró la duración', 404);
      }
      return successResponse(res, {
          data: dataresult
        });
    } catch (error) {
      console.error('Error al obtener duración:', error);
      return errorResponse(res, 'Error al obtener duración', 500);
    }
  }

  static async createRutina(req, res) {
    try {
      const rutina = req.body;
      const { usuario, experience, goal, days, duration, style } = rutina;
      // Validar campos requeridos
      if (!usuario || !experience || !goal || !days || !duration || !style) {
        return errorResponse(res, 'Todos los campos son obligatorios', 400);
      }
      // Guardar rutina en BD
      const created = await Rutina.createRutina(usuario, experience, goal, days, duration, style);
      if (!created) {
        return errorResponse(res, 'Error al crear la rutina', 500);
      }
      return successResponse(res, {
        success: true,
        data: created
      });
    } catch (error) {
      console.error('Error al crear rutina:', error);
      return errorResponse(res, 'Error interno del servidor', 500);
    }
  }

  static async getRutinasUsuario(req, res) {
    try {
      const { idusuario } = req.query;
      if (!idusuario) {
        return errorResponse(res, 'Error de usuario', 404);
      }
      const dataresult = await Rutina.getRutinasUsuario(idusuario);
      if (!dataresult || dataresult.length === 0) {
        return errorResponse(res, 'No se encontró rutinas', 404);
      }
      return successResponse(res, {
          data: dataresult
        });
    } catch (error) {
      console.error('Error al obtener rutinas:', error);
      return errorResponse(res, 'Error al obtener rutinas', 500);
    }
  }
}

module.exports = RutinaController;
