const express = require('express');
const RutinaController = require('../controllers/rutinaController');
const auth = require('../middleware/auth');

const router = express.Router();

// Traer lista de nivel de experiencia
router.get('/experiencie', auth, RutinaController.getNivelesExperiencia);

// Traer lista de metas
router.get('/goal', auth, RutinaController.getObjetivos);

// Traer lista de dias
router.get('/day', auth, RutinaController.getDiasSemana);

// Traer lista de duración en minutos
router.get('/duration', auth, RutinaController.getMinutosDuracion);

// crear rutina
router.post('/create', auth, RutinaController.createRutina);

// Traer lista de rutinas por usuario
router.get('/lista', auth, RutinaController.getRutinasUsuario);

// // Actualizar perfil
// router.put('/updateProfile', auth, RutinaController.updateProfile);

module.exports = router;