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

  // Configuración de splits de entrenamiento según días
  static async getSplitConfiguration(numDias) {
    const grupos = await Rutina.getGruposMusculares();
    if (!grupos || grupos.length === 0) {
      throw new Error('No se encontraron grupos musculares');
    }
    const gruposIds = grupos
      .filter(g => g.id_group !== 6) // Excluir grupo 6 (cuello) si no es necesario
      .map(g => g.id_group);
    const splits = {
      1: [ // Full Body - Todos los grupos en un día
        gruposIds // [1, 2, 3, 4, 5]
      ],
      2: [ // Upper/Lower Split
        [1, 2, 5], // Día 1: Torso superior completo + Brazos
        [3, 4]     // Día 2: Piernas + Core
      ],
      3: [ // Push/Pull/Legs
        [1, 5],    // Día 1: Push (Torso Anterior + Brazos)
        [2, 5],    // Día 2: Pull (Torso Posterior + Brazos)
        [3, 4]     // Día 3: Legs + Core
      ],
      4: [ // Upper/Lower x2
        [1, 5],    // Día 1: Upper Push
        [3, 4],    // Día 2: Lower + Core
        [2, 5],    // Día 3: Upper Pull
        [3, 4]     // Día 4: Lower + Core
      ],
      5: [ // Push/Pull/Legs con día adicional
        [1, 5],    // Día 1: Push
        [2, 5],    // Día 2: Pull
        [3, 4],    // Día 3: Legs + Core
        [1, 2],    // Día 4: Upper combinado
        [3, 4, 5]  // Día 5: Lower + Core + Brazos
      ],
      6: [ // Push/Pull/Legs x2
        [1, 5],    // Día 1: Push
        [2, 5],    // Día 2: Pull
        [3, 4],    // Día 3: Legs + Core
        [1, 5],    // Día 4: Push
        [2, 5],    // Día 5: Pull
        [3, 4]     // Día 6: Legs + Core
      ],
      7: [ // Split detallado
        [1],       // Día 1: Pecho
        [2],       // Día 2: Espalda
        [3],       // Día 3: Piernas
        [4, 5],    // Día 4: Core + Brazos
        [1, 5],    // Día 5: Pecho + Tríceps
        [2, 5],    // Día 6: Espalda + Bíceps
        [3, 4]     // Día 7: Piernas + Core
      ]
    };
    return splits[numDias] || splits[3];
  }

  // Mapear id_group a id_muscle principales
  static async getMusculosPorGrupo(idGrupo) {
    const todosLosMusculos = await Rutina.getMusculosPorGrupo();
    // Filtrar por grupo específico
    const musculosDelGrupo = todosLosMusculos
      .filter(m => m.id_group === idGrupo)
      .map(m => m.id_muscle);
    return musculosDelGrupo;
  }

  // Método principal para crear ejercicios de rutina organizados por días
  static async createEjerciciosRutinaPorDias(experience, goal, days, duration) {
    const ejerciciosDisponibles = await Rutina.getEjerciciosDisponibles();
    if (!ejerciciosDisponibles || ejerciciosDisponibles.length === 0) {
      throw new Error('No hay ejercicios disponibles');
    }
    // Configurar parámetros base según experiencia
    const configuracionBase = RutinaController.getConfiguracionBase(experience, goal, duration);
    // Obtener configuración de split según días
    const splitConfig = await RutinaController.getSplitConfiguration(days);
    // Crear rutina para cada día
    const ejerciciosPorDia = [];
    for (let dia = 0; dia < splitConfig.length; dia++) {
      const gruposDelDia = splitConfig[dia];
      // Calcular ejercicios según cantidad de grupos
      const distribucion = RutinaController.calcularEjerciciosPorGrupo(
        gruposDelDia.length,
        duration,
        experience
      );
      const ejerciciosDia = await RutinaController.seleccionarEjerciciosPorGrupos(
        ejerciciosDisponibles,
        gruposDelDia,
        goal,
        distribucion
      );
      ejerciciosPorDia.push({
        dia: dia + 1,
        ejercicios: ejerciciosDia.map(idEjercicio => ({
          id_exercise: idEjercicio,
          weight_detail: configuracionBase.peso,
          repetition_detail: configuracionBase.repeticiones,
          round_detail: configuracionBase.rondas,
          rest_detail: configuracionBase.descanso
        }))
      });
    }
    return ejerciciosPorDia;
  }

  // Seleccionar ejercicios específicos por grupos musculares
  static async seleccionarEjerciciosPorGrupos(ejerciciosDisponibles, grupos, goal, distribucion) {
    const ejerciciosSeleccionados = [];
    const { base, extra } = distribucion;
    // Para cada grupo muscular del día
    for (let i = 0; i < grupos.length; i++) {
      const idGrupo = grupos[i];
      // Obtener músculos del grupo desde BD
      const musculosDelGrupo = await RutinaController.getMusculosPorGrupo(idGrupo);
      // Filtrar ejercicios que trabajen los músculos de este grupo
      const ejerciciosDelGrupo = ejerciciosDisponibles.filter(ej =>
        musculosDelGrupo.includes(ej.id_muscle) &&
        ej.level_detail === 'principal'
      );
      // Obtener IDs únicos de ejercicios
      const ejerciciosUnicos = [...new Set(ejerciciosDelGrupo.map(e => e.id_exercise))];
      // Calcular cantidad de ejercicios para este grupo
      const cantidadParaGrupo = base + (i < extra ? 1 : 0);
      // Seleccionar ejercicios para este grupo
      const ejerciciosParaGrupo = RutinaController.seleccionarEjerciciosBalanceados(
        ejerciciosUnicos,
        ejerciciosDelGrupo,
        cantidadParaGrupo,
        goal
      );
      ejerciciosSeleccionados.push(...ejerciciosParaGrupo);
    }
    return ejerciciosSeleccionados;
  }

  // Calcular cuántos ejercicios por grupo según duración
  static calcularEjerciciosPorGrupo(numGrupos, duration, experience) {
    const ejerciciosPorDuracion = {
      1: { 1: 4, 2: 5, 3: 6 },   // 30 min
      2: { 1: 5, 2: 6, 3: 7 },   // 45 min
      3: { 1: 6, 2: 8, 3: 10 },  // 60 min
      4: { 1: 8, 2: 10, 3: 12 }, // 90 min
      5: { 1: 10, 2: 12, 3: 15 } // 120 min
    };
    const total = ejerciciosPorDuracion[duration]?.[experience] || 6;
    // Distribución inteligente
    const ejerciciosPorGrupo = Math.floor(total / numGrupos);
    const ejerciciosExtra = total % numGrupos;
    return {
      base: Math.max(2, ejerciciosPorGrupo),
      extra: ejerciciosExtra
    };
  }

  // Seleccionar ejercicios balanceados por músculo
  static seleccionarEjerciciosBalanceados(ejerciciosUnicos, ejerciciosDelGrupo, cantidad, goal) {
    const seleccionados = [];
    const musculosUsados = new Set();
    // Priorizar ejercicios según objetivo
    const ejerciciosOrdenados = RutinaController.priorizarEjerciciosPorObjetivo(
      ejerciciosUnicos,
      ejerciciosDelGrupo,
      goal
    );
    // Seleccionar ejercicios asegurando variedad muscular
    for (const idEjercicio of ejerciciosOrdenados) {
      if (seleccionados.length >= cantidad) break;
      const ejercicio = ejerciciosDelGrupo.find(e => e.id_exercise === idEjercicio);
      if (ejercicio) {
        // Preferir ejercicios de músculos aún no trabajados
        if (!musculosUsados.has(ejercicio.id_muscle) || seleccionados.length < cantidad) {
          seleccionados.push(idEjercicio);
          musculosUsados.add(ejercicio.id_muscle);
        }
      }
    }
    return seleccionados;
  }

  // Priorizar ejercicios según objetivo
  static priorizarEjerciciosPorObjetivo(ejerciciosUnicos, ejerciciosDelGrupo, goal) {
    const ejerciciosConPrioridad = ejerciciosUnicos.map(id => {
      let prioridad = 0;
      // Contar cuántos músculos trabaja
      const musculosTrabajados = ejerciciosDelGrupo.filter(e => e.id_exercise === id).length;
      switch (goal) {
        case 1: // Perder peso - ejercicios compuestos
          prioridad = musculosTrabajados * 2;
          break;
        case 2: // Ganar músculo - equilibrio
          prioridad = musculosTrabajados * 1.5;
          break;
        case 3: // Fuerza - ejercicios compuestos
          prioridad = musculosTrabajados * 2.5;
          break;
        case 4: // Resistencia - variedad
          prioridad = musculosTrabajados;
          break;
        case 5: // Salud general - equilibrio
          prioridad = musculosTrabajados * 1.2;
          break;
      }
      return { id, prioridad };
    });
    // Ordenar por prioridad y devolver IDs
    return ejerciciosConPrioridad
      .sort((a, b) => b.prioridad - a.prioridad)
      .map(e => e.id);
  }

  static getConfiguracionBase(experience, goal, duration) {
    let config = {
      rondas: 3,
      repeticiones: 10,
      peso: 0,
      descanso: 60
    };
    // Configuración según experiencia
    switch (experience) {
      case 1: // Principiante
        switch (goal) {
          case 1: // Perder peso
            config = { rondas: 3, repeticiones: 12, peso: 0, descanso: 60 };
            break;
          case 2: // Ganar músculo
            config = { rondas: 4, repeticiones: 8, peso: 5, descanso: 90 };
            break;
          case 3: // Aumentar fuerza
            config = { rondas: 5, repeticiones: 5, peso: 10, descanso: 120 };
            break;
          case 4: // Resistencia
            config = { rondas: 3, repeticiones: 20, peso: 0, descanso: 45 };
            break;
          case 5: // Salud General
            config = { rondas: 3, repeticiones: 12, peso: 0, descanso: 60 };
            break;
        }
        break;
      case 2: // Intermedio
        switch (goal) {
          case 1: // Perder peso
            config = { rondas: 4, repeticiones: 12, peso: 0, descanso: 45 };
            break;
          case 2: // Ganar músculo
            config = { rondas: 4, repeticiones: 10, peso: 8, descanso: 75 };
            break;
          case 3: // Aumentar fuerza
            config = { rondas: 5, repeticiones: 6, peso: 12, descanso: 120 };
            break;
          case 4: // Resistencia
            config = { rondas: 4, repeticiones: 15, peso: 3, descanso: 45 };
            break;
          case 5: // Salud General
            config = { rondas: 3, repeticiones: 12, peso: 5, descanso: 60 };
            break;
        }
        break;
      case 3: // Avanzado
        switch (goal) {
          case 1: // Perder peso
            config = { rondas: 5, repeticiones: 15, peso: 0, descanso: 30 };
            break;
          case 2: // Ganar músculo
            config = { rondas: 5, repeticiones: 8, peso: 12, descanso: 90 };
            break;
          case 3: // Aumentar fuerza
            config = { rondas: 6, repeticiones: 5, peso: 15, descanso: 150 };
            break;
          case 4: // Resistencia
            config = { rondas: 5, repeticiones: 20, peso: 5, descanso: 30 };
            break;
          case 5: // Salud General
            config = { rondas: 4, repeticiones: 12, peso: 8, descanso: 60 };
            break;
        }
        break;
      case 4: // Competitivo
        config = { rondas: 6, repeticiones: 6, peso: 15, descanso: 120 };
        break;
      case 5: // Recreativo
        config = { rondas: 3, repeticiones: 15, peso: 0, descanso: 60 };
        break;
    }
    // Ajustar según duración
    config = RutinaController.ajustarPorDuracion(config, duration);
    return config;
  }

  static ajustarPorDuracion(config, duration) {
    // Factores de ajuste según duración
    const ajustes = {
      1: { // 30 minutos - Reducir volumen
        rondas: Math.max(2, config.rondas - 1),
        descanso: Math.max(30, config.descanso - 15)
      },
      2: { // 45 minutos - Ligera reducción
        rondas: config.rondas,
        descanso: config.descanso
      },
      3: { // 60 minutos - Estándar
        rondas: config.rondas,
        descanso: config.descanso
      },
      4: { // 90 minutos - Aumentar volumen
        rondas: config.rondas + 1,
        descanso: config.descanso + 15
      },
      5: { // 120 minutos - Máximo volumen
        rondas: config.rondas + 2,
        descanso: config.descanso + 30
      }
    };
    const ajuste = ajustes[duration] || ajustes[3];
    return {
      ...config,
      rondas: ajuste.rondas,
      descanso: ajuste.descanso
    };
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
        return errorResponse(res, 'Ya existe una rutina con estos parámetros', 400);
      }
      // Guardar rutina en BD
      const created = await Rutina.createRutina(usuario, experience, goal, days, duration, style);
      if (!created) {
        return errorResponse(res, 'Error al crear la rutina', 500);
      }
      const rutinaId = created.id;
      // Crear ejercicios organizados por días con distribución de grupos musculares
      const ejerciciosPorDia = await RutinaController.createEjerciciosRutinaPorDias(
        experience,
        goal,
        days,
        duration
      );
      // Verificar que se generaron ejercicios
      if (!ejerciciosPorDia || ejerciciosPorDia.length === 0) {
        await Rutina.deleteRutina(rutinaId);
        return errorResponse(res, 'No se pudieron generar ejercicios para la rutina', 500);
      }
      // Crear detalle de rutina con días específicos
      const detalleCreado = await Rutina.crearDetalleRutina(rutinaId, ejerciciosPorDia);
      if (!detalleCreado) {
        await Rutina.deleteRutina(rutinaId);
        return errorResponse(res, 'Error al agregar ejercicios a la rutina', 500);
      }
      return successResponse(res, {
        success: true,
        data: {
          routine: created,
          exercisesByDay: ejerciciosPorDia,
          message: `Rutina creada con ${ejerciciosPorDia.length} días de entrenamiento`
        }
      });
    } catch (error) {
      console.error('Error al crear rutina:', error);
      return errorResponse(res, error.message || 'Error interno del servidor', 500);
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
        return errorResponse(res, 'ID de rutina requerido', 400);
      }
      const dataresult = await Rutina.getRutinaDetails(idrutina);
      if (!dataresult || dataresult.length === 0) {
        return errorResponse(res, 'No se encontraron ejercicios', 404);
      }
      // Agrupar ejercicios por día
      const exercisesByDay = {};
      dataresult.forEach(item => {
        const dayNumber = item.day_detail || 1;
        if (!exercisesByDay[dayNumber]) {
          exercisesByDay[dayNumber] = [];
        }
        // Buscar si ya existe este ejercicio en el día actual
        const existingExercise = exercisesByDay[dayNumber].find(
          ex => ex.id_exercise === item.id_exercise
        );
        if (!existingExercise) {
          exercisesByDay[dayNumber].push({
            id_detail: item.id_detail,
            id_exercise: item.id_exercise,
            name_exercise: item.name_exercise,
            instruction_exercise: item.instruction_exercise,
            description_exercise: item.description_exercise,
            video_exercise: item.video_exercise,
            weight_detail: item.weight_detail,
            repetition_detail: item.repetition_detail,
            round_detail: item.round_detail,
            muscles: {
              principal: null,
              secundario: null,
              estabilizador: null
            }
          });
        }
        // Agregar el músculo según su nivel
        const exercise = exercisesByDay[dayNumber].find(
          ex => ex.id_exercise === item.id_exercise
        );
        const level = item.level_detail?.toLowerCase();
        if (exercise && (level === 'principal' || level === 'secundario' || level === 'estabilizador')) {
          exercise.muscles[level] = item.name_muscle;
        }
      });
      // Convertir a array y ordenar por día
      const formattedData = Object.keys(exercisesByDay)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map(day => ({
          day: parseInt(day),
          exercises: exercisesByDay[day]
        }));
      return successResponse(res, {
        data: formattedData
      });
    } catch (error) {
      console.error('Error al obtener ejercicios de rutina:', error);
      return errorResponse(res, 'Error al obtener detalles de rutina', 500);
    }
  }
}

module.exports = RutinaController;
