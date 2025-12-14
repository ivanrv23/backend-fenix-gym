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

  static async createEjerciciosRutina(experience, goal, days, duration) {
    let ejercicios = [];
    let rondas, repeticiones, peso, descanso;

    // Primero, obtenemos ejercicios de la base de datos según parámetros
    const ejerciciosDisponibles = await this.getEjerciciosDisponibles(experience, goal);

    if (!ejerciciosDisponibles || ejerciciosDisponibles.length === 0) {
      throw new Error('No hay ejercicios disponibles para los criterios seleccionados');
    }

    // Configuramos parámetros según experiencia, objetivo, días y duración
    switch (experience) {
      case 1: // principiante
        switch (goal) {
          case 1: // Perder peso
            switch (days) {
              case 1: // Un día a la semana
                switch (duration) {
                  case 1: // 30 minutos al día
                    rondas = 3;
                    repeticiones = 10;
                    peso = 0;
                    descanso = 60;
                    ejercicios = [30, 59, 32, 51, 18, 8, 55, 63];
                    break;
                  case 2: // 45 minutos al día
                    rondas = 3;
                    repeticiones = 12;
                    peso = 0;
                    descanso = 60;
                    ejercicios = [30, 59, 32, 51, 18, 8, 55, 63];
                    break;
                  case 3: // 60 minutos al día
                    rondas = 3;
                    repeticiones = 15;
                    peso = 0;
                    descanso = 60;
                    ejercicios = [30, 59, 32, 51, 18, 8, 55, 63];
                    break;
                  case 4: // 90 minutos al día
                    rondas = 4;
                    repeticiones = 15;
                    peso = 0;
                    descanso = 60;
                    ejercicios = [30, 59, 32, 51, 18, 8, 55, 63];
                    break;
                  case 5: // 120 minutos al día
                    rondas = 4;
                    repeticiones = 20;
                    peso = 0;
                    descanso = 60;
                    ejercicios = [30, 59, 32, 51, 18, 8, 55, 63];
                    break;
                  default:
                    rondas = 3;
                    repeticiones = 12;
                    peso = 0;
                    descanso = 60;
                    ejercicios = [30, 59, 32, 51, 18, 8, 55, 63];
                }
                break;
              case 2: // Dos días a la semana
              case 3: // Tres días a la semana
              case 4: // Cuatro días a la semana
              case 5: // Cinco días a la semana
              case 6: // Seis días a la semana
              case 7: // Siete días a la semana
                // Configuración por defecto para otros días
                rondas = 3;
                repeticiones = 12;
                peso = 0;
                descanso = 60;
                break;
              default:
                rondas = 3;
                repeticiones = 12;
                peso = 0;
                descanso = 60;
            }
            break;
          case 2: // Ganar músculo
            rondas = 4;
            repeticiones = 8;
            peso = 5; // kg
            descanso = 90;
            ejercicios = [29, 21, 2, 17, 25, 42, 46, 50];
            break;
          case 3: // Aumentar fuerza
            rondas = 5;
            repeticiones = 5;
            peso = 10; // kg
            descanso = 120;
            ejercicios = [30, 20, 24, 14, 66, 67, 51, 64];
            break;
          case 4: // Resistencia
            rondas = 3;
            repeticiones = 20;
            peso = 0;
            descanso = 45;
            break;
          case 5: // Salud General
            rondas = 3;
            repeticiones = 12;
            peso = 0;
            descanso = 60;
            break;
          default:
            rondas = 3;
            repeticiones = 10;
            peso = 0;
            descanso = 60;
        }
        break;
      case 2: // intermedio
        // Configuraciones para intermedio...
        rondas = 4;
        repeticiones = 10;
        peso = 5;
        descanso = 75;
        break;
      case 3: // Avanzado
        rondas = 5;
        repeticiones = 8;
        peso = 10;
        descanso = 90;
        break;
      case 4: // Competitivo
        rondas = 6;
        repeticiones = 6;
        peso = 15;
        descanso = 120;
        break;
      case 5: // Recreativo
        rondas = 3;
        repeticiones = 15;
        peso = 0;
        descanso = 60;
        break;
      default:
        rondas = 3;
        repeticiones = 10;
        peso = 0;
        descanso = 60;
    }
    return ejercicios;
  }

  static async createRutina(req, res) {
    try {
      const rutina = req.body;
      const { usuario, experience, goal, days, duration, style } = rutina;
      // Validar campos requeridos
      if (!usuario || !experience || !goal || !days || !duration || !style) {
        return errorResponse(res, 'Todos los campos son obligatorios', 400);
      }
      // Validar si ya tiene la rutina creada
      const exist = await Rutina.validateExistRutina(usuario, experience, goal, days, duration);
      if (exist) {
        return errorResponse(res, 'Ya existe rutina creada', 500);
      }
      // Guardar rutina en BD
      const created = await Rutina.createRutina(usuario, experience, goal, days, duration, style);
      if (!created) {
        return errorResponse(res, 'Error al crear la rutina', 500);
      }
      const rutinaId = created.id;
      const ejercicios = this.createEjerciciosRutina(experience, goal, days, duration);
      // Aquí llamarías a otro método para crear el detalle
      const detalleCreado = await Rutina.crearDetalleRutina(rutinaId, ejercicios);
      if (!detalleCreado) {
        // Opcional: puedes decidir si eliminar la rutina si falla el detalle
        return errorResponse(res, 'Rutina creada pero error al agregar ejercicios', 500);
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

  static async getRutinaDetails(req, res) {
    try {
      const { idrutina } = req.query;
      if (!idrutina) {
        return errorResponse(res, 'Error de rutina', 404);
      }
      const dataresult = await Rutina.getRutinaDetails(idrutina);
      if (!dataresult || dataresult.length === 0) {
        return errorResponse(res, 'No se encontró ejercicios', 404);
      }
      return successResponse(res, {
        data: dataresult
      });
    } catch (error) {
      console.error('Error al obtener ejercicios de rutina:', error);
      return errorResponse(res, 'Error al obtener rutina details', 500);
    }
  }
}

module.exports = RutinaController;
