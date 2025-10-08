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

// Actualizar contraseña
router.put('/updatePassword', auth, AuthController.updatePassword);

// Eliminar cuenta
router.put('/delete', auth, AuthController.deleteAccount);

// Aplicar código promocional
router.put('/code', auth, AuthController.applyPromotionCode);

module.exports = router;