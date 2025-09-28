const express = require('express');
const RutinaController = require('../controllers/rutinaController');
const auth = require('../middleware/auth');

const router = express.Router();

// crear rutina
router.post('/create', auth, RutinaController.createRutina);

// // Logout (ruta protegida)
// router.post('/logout', auth, RutinaController.logout);

// // Verificar token (ruta protegida)
// router.get('/verify', auth, RutinaController.verifyToken);

// // Actualizar perfil
// router.put('/updateProfile', auth, RutinaController.updateProfile);

module.exports = router;