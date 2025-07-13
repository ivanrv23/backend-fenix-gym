const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Middleware de autenticación para todas estas rutas
router.use(authMiddleware.authenticate);

// Definir rutas
router.get('/:id', userController.getUser);
router.put('/profile', userController.updateProfile);

// Para depuración
console.log('Tipo de updateProfile:', typeof userController.updateProfile);

module.exports = router;