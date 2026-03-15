const Rutina = require('../models/Rutina');
const { successResponse, errorResponse } = require('../utils/helpers');

class RutinaController {

  static async getNivelesExperiencia(req, res) {
    try {
      const dataresult = await Rutina.getNivelesExperiencia();
      if (!dataresult || dataresult.length === 0) {
        return errorResponse(res, 'No se encontraron niveles de experiencia', 404);
      }
      return successResponse(res, { data: dataresult });
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
      return successResponse(res, { data: dataresult });
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
      return successResponse(res, { data: dataresult });
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
      return successResponse(res, { data: dataresult });
    } catch (error) {
      console.error('Error al obtener duración:', error);
      return errorResponse(res, 'Error al obtener duración', 500);
    }
  }

  // ─── Split de entrenamiento según días ────────────────────────────────────
  static async getSplitConfiguration(numDias) {
    const grupos = await Rutina.getGruposMusculares();
    if (!grupos || grupos.length === 0) {
      throw new Error('No se encontraron grupos musculares');
    }
    const gruposIds = grupos
      .filter(g => g.id_group !== 6)
      .map(g => g.id_group);

    const splits = {
      1: [gruposIds],
      2: [[1, 2, 5], [3, 4]],
      3: [[1, 5], [2, 5], [3, 4]],
      4: [[1, 5], [3, 4], [2, 5], [3, 4]],
      5: [[1, 5], [2, 5], [3, 4], [1, 2], [3, 4, 5]],
      6: [[1, 5], [2, 5], [3, 4], [1, 5], [2, 5], [3, 4]],
      7: [[1], [2], [3], [4, 5], [1, 5], [2, 5], [3, 4]],
    };
    return splits[numDias] || splits[3];
  }

  static async getMusculosPorGrupo(idGrupo) {
    const todosLosMusculos = await Rutina.getMusculosPorGrupo();
    return todosLosMusculos
      .filter(m => m.id_group === idGrupo)
      .map(m => m.id_muscle);
  }

  // ─── Límite de ejercicios según experiencia y objetivo ────────────────────
  /**
   * Reglas:
   * - Principiante (experience=1): máximo 6-7 ejercicios por día
   * - Avanzado (experience=3+): máximo 8 ejercicios por día
   * - Salud general (goal=5): máximo 6-7 ejercicios por día
   * - El resto respeta la tabla de duración pero con tope de 10
   */
  static getLimiteEjercicios(experience, goal, duration) {
    // Tabla base según duración (id_duration: 1=30min, 2=45min, 3=60min, 4=90min, 5=120min)
    const tablaBase = {
      1: { 1: 4, 2: 5, 3: 6 },
      2: { 1: 5, 2: 6, 3: 7 },
      3: { 1: 6, 2: 8, 3: 10 },
      4: { 1: 8, 2: 10, 3: 12 },
      5: { 1: 10, 2: 12, 3: 15 },
    };

    const expKey = Math.min(experience, 3); // clamp a 3 para la tabla
    let total = tablaBase[duration]?.[expKey] ?? 6;

    // Regla: principiante → máximo 7
    if (experience === 1) {
      total = Math.min(total, 7);
    }

    // Regla: avanzado (experience >= 3) → máximo 8
    // (competitivo=4, recreativo=5 se tratan como avanzado en volumen)
    if (experience >= 3) {
      total = Math.min(total, 8);
    }

    // Regla: salud general (goal=5) → máximo 7
    if (goal === 5) {
      total = Math.min(total, 7);
    }

    return total;
  }

  // ─── Crear ejercicios por días ─────────────────────────────────────────────
  static async createEjerciciosRutinaPorDias(experience, goal, days, duration, gender) {
    const ejerciciosDisponibles = await Rutina.getEjerciciosDisponibles();
    if (!ejerciciosDisponibles || ejerciciosDisponibles.length === 0) {
      throw new Error('No hay ejercicios disponibles');
    }

    const configuracionBase = RutinaController.getConfiguracionBase(experience, goal, duration, gender);
    const splitConfig = await RutinaController.getSplitConfiguration(days);
    const limiteTotal = RutinaController.getLimiteEjercicios(experience, goal, duration);

    const ejerciciosPorDia = [];

    for (let dia = 0; dia < splitConfig.length; dia++) {
      const gruposDelDia = splitConfig[dia];

      const distribucion = RutinaController.calcularEjerciciosPorGrupo(
        gruposDelDia.length,
        duration,
        experience,
        goal,
        limiteTotal
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
          rest_detail: configuracionBase.descanso,
        })),
      });
    }

    return ejerciciosPorDia;
  }

  static async seleccionarEjerciciosPorGrupos(ejerciciosDisponibles, grupos, goal, distribucion) {
    const ejerciciosSeleccionados = [];
    const { base, extra } = distribucion;

    for (let i = 0; i < grupos.length; i++) {
      const idGrupo = grupos[i];
      const musculosDelGrupo = await RutinaController.getMusculosPorGrupo(idGrupo);

      const ejerciciosDelGrupo = ejerciciosDisponibles.filter(ej =>
        musculosDelGrupo.includes(ej.id_muscle) &&
        ej.level_detail === 'principal'
      );

      const ejerciciosUnicos = [...new Set(ejerciciosDelGrupo.map(e => e.id_exercise))];
      const cantidadParaGrupo = base + (i < extra ? 1 : 0);

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

  // Ahora recibe limiteTotal para respetar el tope por experiencia/objetivo
  static calcularEjerciciosPorGrupo(numGrupos, duration, experience, goal, limiteTotal) {
    const total = limiteTotal ?? RutinaController.getLimiteEjercicios(experience, goal, duration);
    const ejerciciosPorGrupo = Math.floor(total / numGrupos);
    const ejerciciosExtra = total % numGrupos;

    return {
      base: Math.max(2, ejerciciosPorGrupo),
      extra: ejerciciosExtra,
    };
  }

  static seleccionarEjerciciosBalanceados(ejerciciosUnicos, ejerciciosDelGrupo, cantidad, goal) {
    const seleccionados = [];
    const musculosUsados = new Set();

    const ejerciciosOrdenados = RutinaController.priorizarEjerciciosPorObjetivo(
      ejerciciosUnicos,
      ejerciciosDelGrupo,
      goal
    );

    for (const idEjercicio of ejerciciosOrdenados) {
      if (seleccionados.length >= cantidad) break;
      const ejercicio = ejerciciosDelGrupo.find(e => e.id_exercise === idEjercicio);
      if (ejercicio) {
        if (!musculosUsados.has(ejercicio.id_muscle) || seleccionados.length < cantidad) {
          seleccionados.push(idEjercicio);
          musculosUsados.add(ejercicio.id_muscle);
        }
      }
    }

    return seleccionados;
  }

  static priorizarEjerciciosPorObjetivo(ejerciciosUnicos, ejerciciosDelGrupo, goal) {
    const ejerciciosConPrioridad = ejerciciosUnicos.map(id => {
      const musculosTrabajados = ejerciciosDelGrupo.filter(e => e.id_exercise === id).length;
      let prioridad = 0;
      switch (goal) {
        case 1: prioridad = musculosTrabajados * 2; break; // Perder peso
        case 2: prioridad = musculosTrabajados * 1.5; break; // Ganar músculo
        case 3: prioridad = musculosTrabajados * 2.5; break; // Fuerza
        case 4: prioridad = musculosTrabajados; break; // Resistencia
        case 5: prioridad = musculosTrabajados * 1.2; break; // Salud general
      }
      return { id, prioridad };
    });
    return ejerciciosConPrioridad
      .sort((a, b) => b.prioridad - a.prioridad)
      .map(e => e.id);
  }

  // ─── Pesos balanceados por grupo muscular ─────────────────────────────────
  /**
   * Pesos de referencia (kg) para género MASCULINO, nivel intermedio.
   * Se ajustan por experiencia y género.
   *
   * Grupos musculares:
   *   1 = Pecho        2 = Espalda      3 = Piernas
   *   4 = Core/Abdomen 5 = Brazos
   *
   * Ejercicios dentro de cada grupo tienen rangos distintos;
   * usamos un peso "promedio razonable" por grupo.
   */
  static getPesoBalanceadoPorGrupo(idGrupo, experience, gender) {
    // Pesos base masculino (kg) — nivel intermedio (experience=2)
    const pesosBaseMasculino = {
      1: 40,  // Pecho: press banca, aperturas, etc.
      2: 50,  // Espalda: remo, jalón, etc.
      3: 60,  // Piernas: sentadilla, prensa, etc.
      4: 10,  // Core: peso adicional en abdominales
      5: 20,  // Brazos: curl, extensiones, etc.
    };

    // Factor por nivel de experiencia
    const factorExperiencia = {
      1: 0.55,  // Principiante: ~55% del peso intermedio
      2: 1.0,   // Intermedio: base
      3: 1.35,  // Avanzado: ~35% más
      4: 1.60,  // Competitivo: ~60% más
      5: 0.70,  // Recreativo: ~70% del intermedio
    };

    // Factor por género: femenino usa ~60-65% del peso masculino
    // (ajuste conservador pero realista)
    const factorGenero = gender === 2 ? 0.62 : gender === 0 ? 0.80 : 1.0;

    const pesoBase = pesosBaseMasculino[idGrupo] ?? 20;
    const expFactor = factorExperiencia[experience] ?? 1.0;
    const peso = pesoBase * expFactor * factorGenero;

    // Redondear al múltiplo de 2.5 más cercano (platos estándar)
    return Math.max(0, Math.round(peso / 2.5) * 2.5);
  }

  // ─── Configuración base de series/reps/descanso ───────────────────────────
  /**
   * Ahora recibe `gender` para ajustar el peso.
   * El peso ya no es un escalar fijo: se guarda como 0 aquí y se asigna
   * por grupo muscular en createEjerciciosRutinaPorDias cuando se itera.
   * (Ver nota al pie del método createEjerciciosRutinaPorDias)
   *
   * NOTA: Si deseas peso por ejercicio individual según grupo, ver
   * el parche en createEjerciciosRutinaPorDias más abajo.
   */
  static getConfiguracionBase(experience, goal, duration, gender = 0) {
    let config = { rondas: 3, repeticiones: 10, peso: 0, descanso: 60 };

    switch (experience) {
      case 1: // Principiante
        switch (goal) {
          case 1: config = { rondas: 3, repeticiones: 12, peso: 0, descanso: 60 }; break;
          case 2: config = { rondas: 4, repeticiones: 8, peso: 0, descanso: 90 }; break;
          case 3: config = { rondas: 5, repeticiones: 5, peso: 0, descanso: 120 }; break;
          case 4: config = { rondas: 3, repeticiones: 20, peso: 0, descanso: 45 }; break;
          case 5: config = { rondas: 3, repeticiones: 12, peso: 0, descanso: 60 }; break;
        }
        break;
      case 2: // Intermedio
        switch (goal) {
          case 1: config = { rondas: 4, repeticiones: 12, peso: 0, descanso: 45 }; break;
          case 2: config = { rondas: 4, repeticiones: 10, peso: 0, descanso: 75 }; break;
          case 3: config = { rondas: 5, repeticiones: 6, peso: 0, descanso: 120 }; break;
          case 4: config = { rondas: 4, repeticiones: 15, peso: 0, descanso: 45 }; break;
          case 5: config = { rondas: 3, repeticiones: 12, peso: 0, descanso: 60 }; break;
        }
        break;
      case 3: // Avanzado
        switch (goal) {
          case 1: config = { rondas: 5, repeticiones: 15, peso: 0, descanso: 30 }; break;
          case 2: config = { rondas: 5, repeticiones: 8, peso: 0, descanso: 90 }; break;
          case 3: config = { rondas: 6, repeticiones: 5, peso: 0, descanso: 150 }; break;
          case 4: config = { rondas: 5, repeticiones: 20, peso: 0, descanso: 30 }; break;
          case 5: config = { rondas: 4, repeticiones: 12, peso: 0, descanso: 60 }; break;
        }
        break;
      case 4: // Competitivo
        config = { rondas: 6, repeticiones: 6, peso: 0, descanso: 120 };
        break;
      case 5: // Recreativo
        config = { rondas: 3, repeticiones: 15, peso: 0, descanso: 60 };
        break;
    }

    // El peso real se asigna por grupo muscular; aquí se deja en 0
    // para que createEjerciciosRutinaPorDias lo resuelva con getPesoBalanceadoPorGrupo
    config.peso = 0;

    return RutinaController.ajustarPorDuracion(config, duration);
  }

  static ajustarPorDuracion(config, duration) {
    const ajustes = {
      1: { rondas: Math.max(2, config.rondas - 1), descanso: Math.max(30, config.descanso - 15) },
      2: { rondas: config.rondas, descanso: config.descanso },
      3: { rondas: config.rondas, descanso: config.descanso },
      4: { rondas: config.rondas + 1, descanso: config.descanso + 15 },
      5: { rondas: config.rondas + 2, descanso: config.descanso + 30 },
    };
    const ajuste = ajustes[duration] || ajustes[3];
    return { ...config, rondas: ajuste.rondas, descanso: ajuste.descanso };
  }

  // ─── Crear rutina ──────────────────────────────────────────────────────────
  static async createRutina(req, res) {
    try {
      let { usuario, experience, goal, days, duration, style, gender } = req.body;

      // Validar campos requeridos — gender es nuevo campo obligatorio
      if (!usuario || !experience || !goal || !days || !duration || !style || gender === undefined) {
        return errorResponse(res, 'Todos los campos son obligatorios', 400);
      }

      // Validar valor de gender
      const generoValido = [0, 1, 2];
      if (!generoValido.includes(Number(gender))) {
        return errorResponse(res, 'Error en el género', 400);
      }
      gender = Number(gender);

      // Validar si ya existe la rutina
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

      // Crear ejercicios — ahora pasamos gender
      const ejerciciosPorDia = await RutinaController.createEjerciciosRutinaPorDias(
        experience, goal, days, duration, gender
      );

      if (!ejerciciosPorDia || ejerciciosPorDia.length === 0) {
        await Rutina.deleteRutina(rutinaId);
        return errorResponse(res, 'No se pudieron generar ejercicios para la rutina', 500);
      }

      // Asignar peso balanceado por grupo muscular a cada ejercicio del día
      const splitConfig = await RutinaController.getSplitConfiguration(days);
      ejerciciosPorDia.forEach((diaData, diaIdx) => {
        const gruposDelDia = splitConfig[diaIdx] || [];
        diaData.ejercicios.forEach((ej, ejIdx) => {
          // Distribuir ejercicios proporcionalmente entre los grupos del día
          const gruposPorEjercicio = gruposDelDia.length;
          const idGrupo = gruposDelDia[ejIdx % gruposPorEjercicio] ?? gruposDelDia[0];
          ej.weight_detail = RutinaController.getPesoBalanceadoPorGrupo(idGrupo, experience, gender);
        });
      });

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
          message: `Rutina creada con ${ejerciciosPorDia.length} días de entrenamiento`,
        },
      });
    } catch (error) {
      console.error('Error al crear rutina:', error);
      return errorResponse(res, error.message || 'Error interno del servidor', 500);
    }
  }

  // ─── Consultas ─────────────────────────────────────────────────────────────
  static async getRutinasUsuario(req, res) {
    try {
      const { idusuario } = req.query;
      if (!idusuario) return errorResponse(res, 'Error de usuario', 404);
      const dataresult = await Rutina.getRutinasUsuario(idusuario);
      if (!dataresult || dataresult.length === 0)
        return errorResponse(res, 'No se encontró rutinas', 404);
      return successResponse(res, { data: dataresult });
    } catch (error) {
      console.error('Error al obtener rutinas:', error);
      return errorResponse(res, 'Error al obtener rutinas', 500);
    }
  }

  static async getRutinaDetails(req, res) {
    try {
      const { idrutina } = req.query;
      if (!idrutina) return errorResponse(res, 'ID de rutina requerido', 400);

      const dataresult = await Rutina.getRutinaDetails(idrutina);
      if (!dataresult || dataresult.length === 0)
        return errorResponse(res, 'No se encontraron ejercicios', 404);

      const exercisesByDay = {};
      dataresult.forEach(item => {
        const dayNumber = item.day_detail || 1;
        if (!exercisesByDay[dayNumber]) exercisesByDay[dayNumber] = [];

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
            muscles: { principal: null, secundario: null, estabilizador: null },
          });
        }

        const exercise = exercisesByDay[dayNumber].find(
          ex => ex.id_exercise === item.id_exercise
        );
        const level = item.level_detail?.toLowerCase();
        if (exercise && ['principal', 'secundario', 'estabilizador'].includes(level)) {
          exercise.muscles[level] = item.name_muscle;
        }
      });

      const formattedData = Object.keys(exercisesByDay)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map(day => ({ day: parseInt(day), exercises: exercisesByDay[day] }));

      return successResponse(res, { data: formattedData });
    } catch (error) {
      console.error('Error al obtener ejercicios de rutina:', error);
      return errorResponse(res, 'Error al obtener detalles de rutina', 500);
    }
  }
}

module.exports = RutinaController;