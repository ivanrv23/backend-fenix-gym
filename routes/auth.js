const express = require('express');
const AuthController = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// Login
router.post('/login', AuthController.login);

// Logout (ruta protegida)
router.post('/logout', auth, AuthController.logout);

// Verificar token (ruta protegida)
router.get('/verify', auth, AuthController.verifyToken);

// Actualizar perfil
router.put('/updateProfile', auth, AuthController.updateProfile);

module.exports = router;